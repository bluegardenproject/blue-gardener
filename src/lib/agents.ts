import fs from "fs";
import path from "path";
import {
  getBundledAgentsDir,
  getProjectAgentsDir,
  ensureProjectAgentsDir,
} from "./paths.js";
import {
  readManifest,
  writeManifest,
  createManifest,
  addAgentToManifest,
  removeAgentFromManifest,
  getInstalledAgentNames,
} from "./manifest.js";

// Read version from package.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");
const PACKAGE_VERSION: string = packageJson.version;

export interface AgentInfo {
  name: string;
  description: string;
  filename: string;
}

/**
 * Parse agent metadata from frontmatter
 */
function parseAgentFrontmatter(content: string): {
  name: string;
  description: string;
} {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { name: "", description: "" };
  }

  const frontmatter = frontmatterMatch[1];
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

  return {
    name: nameMatch ? nameMatch[1].trim() : "",
    description: descMatch ? descMatch[1].trim() : "",
  };
}

/**
 * Get list of available agents from the bundled agents directory
 */
export function getAvailableAgents(): AgentInfo[] {
  const agentsDir = getBundledAgentsDir();
  if (!fs.existsSync(agentsDir)) {
    return [];
  }

  const files = fs.readdirSync(agentsDir).filter((f) => f.endsWith(".md"));
  return files.map((filename) => {
    const content = fs.readFileSync(path.join(agentsDir, filename), "utf-8");
    const { name, description } = parseAgentFrontmatter(content);
    return {
      name: name || path.basename(filename, ".md"),
      description,
      filename,
    };
  });
}

/**
 * Get list of installed agents with their info
 */
export function getInstalledAgents(): AgentInfo[] {
  const installedNames = getInstalledAgentNames();
  const availableAgents = getAvailableAgents();

  return availableAgents.filter((agent) => installedNames.includes(agent.name));
}

/**
 * Install an agent to the project
 */
export function installAgent(agentName: string): boolean {
  const availableAgents = getAvailableAgents();
  const agent = availableAgents.find((a) => a.name === agentName);

  if (!agent) {
    return false;
  }

  ensureProjectAgentsDir();

  // Copy the agent file
  const sourcePath = path.join(getBundledAgentsDir(), agent.filename);
  const destPath = path.join(getProjectAgentsDir(), agent.filename);
  fs.copyFileSync(sourcePath, destPath);

  // Update manifest
  let manifest = readManifest();
  if (!manifest) {
    manifest = createManifest(PACKAGE_VERSION);
  }
  manifest = addAgentToManifest(manifest, agentName, PACKAGE_VERSION);
  writeManifest(manifest);

  return true;
}

/**
 * Remove an agent from the project
 */
export function removeAgent(agentName: string): boolean {
  const manifest = readManifest();
  if (!manifest || !manifest.agents[agentName]) {
    return false;
  }

  // Find the agent file
  const availableAgents = getAvailableAgents();
  const agent = availableAgents.find((a) => a.name === agentName);

  if (agent) {
    const filePath = path.join(getProjectAgentsDir(), agent.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  // Update manifest
  const updatedManifest = removeAgentFromManifest(manifest, agentName);
  writeManifest(updatedManifest);

  return true;
}

/**
 * Sync all installed agents to the latest version
 */
export function syncAgents(): { synced: string[]; failed: string[] } {
  const manifest = readManifest();
  if (!manifest) {
    return { synced: [], failed: [] };
  }

  const synced: string[] = [];
  const failed: string[] = [];

  for (const agentName of Object.keys(manifest.agents)) {
    const availableAgents = getAvailableAgents();
    const agent = availableAgents.find((a) => a.name === agentName);

    if (!agent) {
      failed.push(agentName);
      continue;
    }

    // Copy the latest version
    const sourcePath = path.join(getBundledAgentsDir(), agent.filename);
    const destPath = path.join(getProjectAgentsDir(), agent.filename);

    try {
      fs.copyFileSync(sourcePath, destPath);
      synced.push(agentName);
    } catch {
      failed.push(agentName);
    }
  }

  // Update manifest version
  if (synced.length > 0) {
    manifest.version = PACKAGE_VERSION;
    for (const name of synced) {
      manifest.agents[name].version = PACKAGE_VERSION;
    }
    writeManifest(manifest);
  }

  return { synced, failed };
}
