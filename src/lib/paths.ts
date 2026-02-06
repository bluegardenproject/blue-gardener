import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { Platform } from "./platform.js";

/**
 * Get the directory where the package is installed
 */
export function getPackageDir(): string {
  const currentFile = fileURLToPath(import.meta.url);
  // Go up from dist/lib/paths.js to package root
  return path.resolve(path.dirname(currentFile), "..", "..");
}

/**
 * Get the directory containing bundled agents
 */
export function getBundledAgentsDir(): string {
  return path.join(getPackageDir(), "agents");
}

/**
 * Get the project's agents directory based on platform
 */
export function getProjectAgentsDir(platform?: Platform): string {
  const cwd = process.cwd();

  // Default to cursor for backward compatibility
  const targetPlatform = platform || "cursor";

  switch (targetPlatform) {
    case "cursor":
      return path.join(cwd, ".cursor", "agents");
    case "claude-desktop":
      return path.join(cwd, ".claude", "agents");
    case "windsurf":
      return path.join(cwd, ".windsurf", "rules");
    case "opencode":
      return path.join(cwd, ".opencode", "agents");
    case "codex":
    case "github-copilot":
      // Single-file platforms don't have a directory
      return cwd;
    default:
      return path.join(cwd, ".cursor", "agents");
  }
}

/**
 * Get the path to the manifest file
 * For backward compatibility, always stored in .cursor/agents
 */
export function getManifestPath(): string {
  const manifestDir = path.join(process.cwd(), ".cursor", "agents");
  return path.join(manifestDir, ".blue-generated-manifest.json");
}

/**
 * Ensure the project's agents directory exists
 */
export function ensureProjectAgentsDir(platform?: Platform): void {
  const dir = getProjectAgentsDir(platform);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Also ensure manifest directory exists
  const manifestDir = path.dirname(getManifestPath());
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }
}
