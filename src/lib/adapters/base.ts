import fs from "fs";
import path from "path";
import { Platform } from "../platform.js";
import { AgentInfo } from "../agents.js";
import { getBundledAgentsDir } from "../paths.js";

export interface ParsedAgent {
  frontmatter: Record<string, any>;
  systemPrompt: string;
  sections: AgentSection[];
}

export interface AgentSection {
  header: string;
  level: number;
  content: string;
}

/**
 * Base adapter interface for platform-specific agent installation
 */
export abstract class PlatformAdapter {
  abstract readonly platform: Platform;
  abstract readonly isSingleFile: boolean;

  /**
   * Install a single agent
   */
  abstract installAgent(agentName: string, agentInfo: AgentInfo): void;

  /**
   * Remove a single agent
   */
  abstract removeAgent(agentName: string, agentInfo: AgentInfo): void;

  /**
   * Sync all installed agents
   */
  abstract syncAgents(installedAgents: AgentInfo[]): void;

  /**
   * Get output path for this platform
   */
  abstract getOutputPath(): string;

  /**
   * Load agent content from bundled source
   */
  protected loadAgentContent(agentInfo: AgentInfo): string {
    const sourcePath = path.join(getBundledAgentsDir(), agentInfo.sourcePath);
    return fs.readFileSync(sourcePath, "utf-8");
  }

  /**
   * Parse agent markdown into structured format
   */
  protected parseAgentMarkdown(content: string): ParsedAgent {
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    let remainingContent = content;
    let frontmatter: Record<string, any> = {};

    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      remainingContent = content.substring(frontmatterMatch[0].length);

      // Parse YAML frontmatter (simple parser)
      const lines = frontmatterText.split("\n");
      for (const line of lines) {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
          const [, key, value] = match;
          // Handle arrays: tags: [tag1, tag2]
          if (value.startsWith("[") && value.endsWith("]")) {
            frontmatter[key] = value
              .slice(1, -1)
              .split(",")
              .map((v) => v.trim());
          } else {
            frontmatter[key] = value.trim();
          }
        }
      }
    }

    // Extract system prompt (first paragraph before first header)
    const firstHeaderMatch = remainingContent.match(/\n##\s+/);
    const systemPrompt = firstHeaderMatch
      ? remainingContent.substring(0, firstHeaderMatch.index).trim()
      : remainingContent.trim();

    // Parse sections
    const sections: AgentSection[] = [];
    const sectionRegex = /^(#{2,})\s+(.+)$/gm;
    let match;
    const headerPositions: Array<{
      level: number;
      header: string;
      pos: number;
    }> = [];

    while ((match = sectionRegex.exec(remainingContent)) !== null) {
      headerPositions.push({
        level: match[1].length,
        header: match[2],
        pos: match.index,
      });
    }

    for (let i = 0; i < headerPositions.length; i++) {
      const current = headerPositions[i];
      const next = headerPositions[i + 1];
      const contentStart =
        current.pos + current.header.length + current.level + 1;
      const contentEnd = next ? next.pos : remainingContent.length;
      const sectionContent = remainingContent
        .substring(contentStart, contentEnd)
        .trim();

      sections.push({
        header: current.header,
        level: current.level,
        content: sectionContent,
      });
    }

    return {
      frontmatter,
      systemPrompt,
      sections,
    };
  }

  /**
   * Remove agent delegation references for platforms that don't support it
   */
  protected removeAgentReferences(content: string): string {
    // Remove @blue-agent-name references
    return content.replace(/@blue-[\w-]+/g, "the appropriate specialist");
  }

  /**
   * Transform header text based on platform conventions
   */
  protected transformHeader(
    header: string,
    mappings: Record<string, string | null>
  ): string | null {
    const mapping = mappings[header];
    if (mapping === null) {
      return null; // Skip this section
    }
    return mapping || header; // Use mapping or keep original
  }
}
