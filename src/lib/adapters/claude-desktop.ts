import fs from "fs";
import path from "path";
import { PlatformAdapter } from "./base.js";
import { AgentInfo } from "../agents.js";
import { getProjectAgentsDir } from "../paths.js";

/**
 * Claude Desktop adapter - nearly identical to Cursor
 */
export class ClaudeDesktopAdapter extends PlatformAdapter {
  readonly platform = "claude-desktop" as const;
  readonly isSingleFile = false;

  getOutputPath(): string {
    return getProjectAgentsDir("claude-desktop");
  }

  installAgent(agentName: string, agentInfo: AgentInfo): void {
    const content = this.loadAgentContent(agentInfo);
    const outputDir = this.getOutputPath();
    const outputPath = path.join(outputDir, agentInfo.filename);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Claude Desktop uses same format as Cursor
    fs.writeFileSync(outputPath, content);
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
}
