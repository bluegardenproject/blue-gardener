import fs from "fs";
import path from "path";
import { select } from "@inquirer/prompts";

export type Platform =
  | "cursor"
  | "claude-desktop"
  | "codex"
  | "github-copilot"
  | "windsurf"
  | "opencode";

export interface PlatformInfo {
  id: Platform;
  name: string;
  description: string;
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "cursor",
    name: "Cursor",
    description: "Cursor IDE with native agent support",
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop",
    description: "Claude Desktop with MCP agents",
  },
  {
    id: "codex",
    name: "Codex",
    description: "OpenAI Codex with AGENTS.md file",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "GitHub Copilot with custom instructions",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description: "Windsurf IDE with Cascade rules",
  },
  {
    id: "opencode",
    name: "OpenCode",
    description: "OpenCode with custom agents",
  },
];

/**
 * Auto-detect platform based on project structure
 */
export function detectPlatform(): Platform | null {
  const cwd = process.cwd();

  // Check for platform-specific directories/files
  if (fs.existsSync(path.join(cwd, ".cursor", "agents"))) {
    return "cursor";
  }

  if (fs.existsSync(path.join(cwd, ".claude", "agents"))) {
    return "claude-desktop";
  }

  if (fs.existsSync(path.join(cwd, ".windsurf"))) {
    return "windsurf";
  }

  if (fs.existsSync(path.join(cwd, ".opencode", "agents"))) {
    return "opencode";
  }

  if (fs.existsSync(path.join(cwd, ".github", "copilot-instructions.md"))) {
    return "github-copilot";
  }

  if (fs.existsSync(path.join(cwd, "AGENTS.md"))) {
    return "codex";
  }

  return null;
}

/**
 * Parse platform from user input.
 */
export function parsePlatform(value: string): Platform | null {
  if (PLATFORMS.some((platform) => platform.id === value)) {
    return value as Platform;
  }
  return null;
}

/**
 * Get platforms that can still be added.
 */
export function getAvailablePlatformsToAdd(
  enabled: Platform[]
): PlatformInfo[] {
  return PLATFORMS.filter((platform) => !enabled.includes(platform.id));
}

/**
 * Prompt user to select a platform
 */
export async function promptForPlatform(options?: {
  exclude?: Platform[];
  message?: string;
}): Promise<Platform> {
  const exclude = options?.exclude ?? [];
  const choices = PLATFORMS.filter((p) => !exclude.includes(p.id)).map((p) => ({
    name: p.name,
    value: p.id,
    description: p.description,
  }));

  if (choices.length === 0) {
    throw new Error("All platforms are already enabled.");
  }

  const platform = await select({
    message: options?.message || "Which platform are you using?",
    choices,
  });

  return platform;
}

/**
 * Get platform info by ID
 */
export function getPlatformInfo(platform: Platform): PlatformInfo {
  const info = PLATFORMS.find((p) => p.id === platform);
  if (!info) {
    throw new Error(`Unknown platform: ${platform}`);
  }
  return info;
}
