import { Platform } from "../platform.js";
import { PlatformAdapter } from "./base.js";
import { CursorAdapter } from "./cursor.js";
import { ClaudeDesktopAdapter } from "./claude-desktop.js";
import { CodexAdapter } from "./codex.js";
import { GitHubCopilotAdapter } from "./github-copilot.js";
import { WindsurfAdapter } from "./windsurf.js";
import { OpenCodeAdapter } from "./opencode.js";

/**
 * Factory to get the appropriate adapter for a platform
 */
export function getAdapter(platform: Platform): PlatformAdapter {
  switch (platform) {
    case "cursor":
      return new CursorAdapter();
    case "claude-desktop":
      return new ClaudeDesktopAdapter();
    case "codex":
      return new CodexAdapter();
    case "github-copilot":
      return new GitHubCopilotAdapter();
    case "windsurf":
      return new WindsurfAdapter();
    case "opencode":
      return new OpenCodeAdapter();
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}

export * from "./base.js";
