import fs from "fs";
import path from "path";
import { PlatformAdapter } from "./base.js";
import { AgentInfo } from "../agents.js";

/**
 * GitHub Copilot adapter - combines agents into single .github/copilot-instructions.md file
 */
export class GitHubCopilotAdapter extends PlatformAdapter {
  readonly platform = "github-copilot" as const;
  readonly isSingleFile = true;

  private readonly COPILOT_FILE = ".github/copilot-instructions.md";
  private readonly HEADER_MAPPINGS: Record<string, string | null> = {
    "When Invoked": "Guidelines",
    "Core Responsibilities": "Overview",
    "Delegation Guidelines": null, // Skip - Copilot doesn't have delegation
    "Output Format": "Expected Output",
  };

  getOutputPath(): string {
    return path.join(process.cwd(), this.COPILOT_FILE);
  }

  installAgent(agentName: string, agentInfo: AgentInfo): void {
    const agentContent = this.transformAgent(agentInfo);
    const copilotFilePath = this.getOutputPath();
    const copilotDir = path.dirname(copilotFilePath);

    // Ensure .github directory exists
    if (!fs.existsSync(copilotDir)) {
      fs.mkdirSync(copilotDir, { recursive: true });
    }

    if (!fs.existsSync(copilotFilePath)) {
      // First agent - create file with header
      const header =
        "# Blue Gardener AI Agents\n\nThis project uses specialized AI agents from Blue Gardener.\n\n";
      fs.writeFileSync(copilotFilePath, header + agentContent);
    } else {
      // Append to existing file
      fs.appendFileSync(copilotFilePath, "\n\n---\n\n" + agentContent);
    }
  }

  removeAgent(agentName: string, agentInfo: AgentInfo): void {
    const copilotFilePath = this.getOutputPath();
    if (!fs.existsSync(copilotFilePath)) return;

    const content = fs.readFileSync(copilotFilePath, "utf-8");
    const sections = this.parseSections(content);

    // Filter out the agent section
    const filtered = sections.filter((s) => s.agentName !== agentName);

    if (filtered.length === 0) {
      // No agents left - remove file
      fs.unlinkSync(copilotFilePath);
    } else {
      // Rebuild file with remaining sections
      this.rebuildFile(copilotFilePath, filtered);
    }
  }

  syncAgents(installedAgents: AgentInfo[]): void {
    const copilotFilePath = this.getOutputPath();
    const copilotDir = path.dirname(copilotFilePath);

    // Ensure .github directory exists
    if (!fs.existsSync(copilotDir)) {
      fs.mkdirSync(copilotDir, { recursive: true });
    }

    // Regenerate entire file from scratch
    const header =
      "# Blue Gardener AI Agents\n\nThis project uses specialized AI agents from Blue Gardener.\n\n";
    const sections = installedAgents.map((agent) => this.transformAgent(agent));

    const content = header + sections.join("\n\n---\n\n");
    fs.writeFileSync(copilotFilePath, content);
  }

  private transformAgent(agentInfo: AgentInfo): string {
    const content = this.loadAgentContent(agentInfo);
    const parsed = this.parseAgentMarkdown(content);

    let output = `## ${parsed.frontmatter.description || agentInfo.description}\n\n`;
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

      output += `### ${newHeader}\n\n`;
      output += this.removeAgentReferences(section.content) + "\n\n";
    }

    return output.trim();
  }

  private parseSections(
    content: string
  ): Array<{ agentName: string; content: string }> {
    const parts = content.split(/\n---\n/);
    const sections: Array<{ agentName: string; content: string }> = [];

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed || trimmed.startsWith("# Blue Gardener")) continue;

      // Try to extract agent name from first header
      const headerMatch = trimmed.match(/^##\s+(.+?)$/m);
      const agentName = headerMatch ? headerMatch[1] : "unknown";

      sections.push({
        agentName,
        content: trimmed,
      });
    }

    return sections;
  }

  private rebuildFile(
    filePath: string,
    sections: Array<{ agentName: string; content: string }>
  ): void {
    const header =
      "# Blue Gardener AI Agents\n\nThis project uses specialized AI agents from Blue Gardener.\n\n";
    const content = header + sections.map((s) => s.content).join("\n\n---\n\n");
    fs.writeFileSync(filePath, content);
  }
}
