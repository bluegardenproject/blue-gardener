import fs from "fs";
import path from "path";
import { PlatformAdapter } from "./base.js";
import { AgentInfo } from "../agents.js";
import { getProjectAgentsDir } from "../paths.js";

/**
 * Windsurf adapter - converts agents to rule format
 */
export class WindsurfAdapter extends PlatformAdapter {
  readonly platform = "windsurf" as const;
  readonly isSingleFile = false;

  private readonly HEADER_MAPPINGS: Record<string, string | null> = {
    "When Invoked": "When This Rule Applies",
    "Core Responsibilities": "Rules",
    Guidelines: "Rules",
    "Delegation Guidelines": null, // Skip - Windsurf doesn't have delegation
    "Output Format": "Expected Output",
  };

  getOutputPath(): string {
    return getProjectAgentsDir("windsurf");
  }

  installAgent(agentName: string, agentInfo: AgentInfo): void {
    const content = this.loadAgentContent(agentInfo);
    const transformed = this.transformToRule(content, agentInfo);
    const outputDir = this.getOutputPath();
    const outputPath = path.join(outputDir, agentInfo.filename);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, transformed);
  }

  removeAgent(agentName: string, agentInfo: AgentInfo): void {
    const outputPath = path.join(this.getOutputPath(), agentInfo.filename);
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  }

  syncAgents(installedAgents: AgentInfo[]): void {
    // Update each file individually
    for (const agent of installedAgents) {
      this.installAgent(agent.name, agent);
    }
  }

  private transformToRule(content: string, agentInfo: AgentInfo): string {
    const parsed = this.parseAgentMarkdown(content);

    // Windsurf uses simpler format - rules rather than agent behavior
    let output = `# ${parsed.frontmatter.description || agentInfo.description}\n\n`;
    output += this.removeAgentReferences(parsed.systemPrompt) + "\n\n";

    // Transform and add sections
    for (const section of parsed.sections) {
      const newHeader = this.transformHeader(
        section.header,
        this.HEADER_MAPPINGS
      );

      if (newHeader === null) {
        continue; // Skip this section
      }

      output += `## ${newHeader}\n\n`;
      // Reframe content as rules/guidance rather than agent instructions
      const transformedContent = this.removeAgentReferences(section.content)
        .replace(/delegate to/gi, "apply")
        .replace(/you are/gi, "use")
        .replace(/your/gi, "the");
      output += transformedContent + "\n\n";
    }

    return output.trim();
  }
}
