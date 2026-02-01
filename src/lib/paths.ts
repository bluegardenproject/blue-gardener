import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

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
 * Get the project's .cursor/agents directory
 */
export function getProjectAgentsDir(): string {
  return path.join(process.cwd(), ".cursor", "agents");
}

/**
 * Get the path to the manifest file
 */
export function getManifestPath(): string {
  return path.join(getProjectAgentsDir(), ".blue-generated-manifest.json");
}

/**
 * Ensure the project's .cursor/agents directory exists
 */
export function ensureProjectAgentsDir(): void {
  const dir = getProjectAgentsDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
