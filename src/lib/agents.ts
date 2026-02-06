import fs from "fs";
import path from "path";
import chalk from "chalk";
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
  updatePlatform,
} from "./manifest.js";
import { Platform, detectPlatform } from "./platform.js";
import { getAdapter } from "./adapters/index.js";

// Read version from package.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");
const PACKAGE_VERSION: string = packageJson.version;

/**
 * Check if debug mode is enabled via environment variable
 */
function isDebugEnabled(): boolean {
  return (
    process.env.DEBUG === "blue-gardener" ||
    process.env.BLUE_GARDENER_DEBUG === "1" ||
    process.env.BLUE_GARDENER_DEBUG === "true"
  );
}

/**
 * Log debug message if debug mode is enabled
 */
function debugLog(message: string): void {
  if (isDebugEnabled()) {
    console.log(chalk.gray(`[debug] ${message}`));
  }
}

export interface AgentInfo {
  name: string;
  description: string;
  filename: string;
  /** Relative path from agents dir to source file (for subfolder support) */
  sourcePath: string;
  tags: string[];
  category: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  count: number;
}

/**
 * Get list of all categories with agent counts
 */
export function getCategories(): CategoryInfo[] {
  const agents = getAvailableAgents();
  const categoryCounts = new Map<string, number>();

  for (const agent of agents) {
    const category = agent.category || "other";
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  }

  const categoryOrder = [
    "orchestrator",
    "development",
    "quality",
    "infrastructure",
    "configuration",
    "blockchain",
    "other",
  ];

  const categories: CategoryInfo[] = [];
  for (const categoryId of categoryOrder) {
    const count = categoryCounts.get(categoryId);
    if (count) {
      categories.push({
        id: categoryId,
        name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
        count,
      });
    }
  }

  return categories;
}

/**
 * Get agents by category
 */
export function getAgentsByCategory(category: string): AgentInfo[] {
  const agents = getAvailableAgents();
  return agents.filter((a) => a.category === category);
}

/**
 * Parse agent metadata from frontmatter
 */
function parseAgentFrontmatter(content: string): {
  name: string;
  description: string;
  tags: string[];
  category: string;
} {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { name: "", description: "", tags: [], category: "" };
  }

  const frontmatter = frontmatterMatch[1];
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  const categoryMatch = frontmatter.match(/^category:\s*(.+)$/m);

  // Parse tags array: tags: [tag1, tag2, tag3]
  const tagsMatch = frontmatter.match(/^tags:\s*\[([^\]]*)\]$/m);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return {
    name: nameMatch ? nameMatch[1].trim() : "",
    description: descMatch ? descMatch[1].trim() : "",
    tags,
    category: categoryMatch ? categoryMatch[1].trim() : "",
  };
}

/**
 * Recursively find all .md files in a directory
 */
function findMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) {
    return results;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Recursively search subdirectories
      results.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Get list of available agents from the bundled agents directory
 */
export function getAvailableAgents(): AgentInfo[] {
  const agentsDir = getBundledAgentsDir();
  if (!fs.existsSync(agentsDir)) {
    return [];
  }

  // Recursively find all .md files in agents directory and subdirectories
  const files = findMarkdownFiles(agentsDir);
  const agents: AgentInfo[] = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf-8");
    const { name, description, tags, category } =
      parseAgentFrontmatter(content);
    const relativePath = path.relative(agentsDir, filePath);

    // Skip files without valid name frontmatter (e.g., CATALOG.md)
    if (!name) {
      debugLog(`Skipped ${relativePath} - no 'name' field in frontmatter`);
      continue;
    }

    // Use just the filename (not the full path) for the output file
    const filename = path.basename(filePath);
    agents.push({
      name,
      description,
      filename,
      // Store the relative path from agents dir for source lookup
      sourcePath: relativePath,
      tags,
      category,
    });
  }

  return agents;
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
export function installAgent(agentName: string, platform?: Platform): boolean {
  const availableAgents = getAvailableAgents();
  const agent = availableAgents.find((a) => a.name === agentName);

  if (!agent) {
    return false;
  }

  // Get platform from manifest or parameter
  let manifest = readManifest();
  const targetPlatform =
    platform || manifest?.platform || detectPlatform() || "cursor";

  // Get adapter for platform
  const adapter = getAdapter(targetPlatform);

  // Ensure directory exists
  ensureProjectAgentsDir(targetPlatform);

  // Install agent using adapter
  try {
    adapter.installAgent(agentName, agent);
  } catch (error) {
    debugLog(`Failed to install ${agentName}: ${error}`);
    return false;
  }

  // Update manifest
  if (!manifest) {
    manifest = createManifest(PACKAGE_VERSION, targetPlatform);
  } else if (!manifest.platform) {
    manifest = updatePlatform(manifest, targetPlatform);
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

  // Get platform from manifest
  const platform = manifest.platform || detectPlatform() || "cursor";
  const adapter = getAdapter(platform);

  // Find the agent info
  const availableAgents = getAvailableAgents();
  const agent = availableAgents.find((a) => a.name === agentName);

  if (agent) {
    try {
      adapter.removeAgent(agentName, agent);
    } catch (error) {
      debugLog(`Failed to remove ${agentName}: ${error}`);
      return false;
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

  // Get platform from manifest
  const platform = manifest.platform || detectPlatform() || "cursor";
  const adapter = getAdapter(platform);

  const synced: string[] = [];
  const failed: string[] = [];

  // Get installed agents info
  const availableAgents = getAvailableAgents();
  const installedAgents: typeof availableAgents = [];

  for (const agentName of Object.keys(manifest.agents)) {
    const agent = availableAgents.find((a) => a.name === agentName);
    if (agent) {
      installedAgents.push(agent);
    } else {
      failed.push(agentName);
    }
  }

  if (adapter.isSingleFile) {
    // Single-file platforms: regenerate entire file
    try {
      adapter.syncAgents(installedAgents);
      synced.push(...installedAgents.map((a) => a.name));
    } catch (error) {
      debugLog(`Failed to sync agents: ${error}`);
      failed.push(...installedAgents.map((a) => a.name));
    }
  } else {
    // Multi-file platforms: update each file individually
    for (const agent of installedAgents) {
      try {
        adapter.installAgent(agent.name, agent);
        synced.push(agent.name);
      } catch (error) {
        debugLog(`Failed to sync ${agent.name}: ${error}`);
        failed.push(agent.name);
      }
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

/**
 * Find orphaned blue-* agent files that exist in project but aren't in manifest
 */
export function findOrphanedAgents(): AgentInfo[] {
  const projectAgentsDir = getProjectAgentsDir();
  if (!fs.existsSync(projectAgentsDir)) {
    return [];
  }

  const manifest = readManifest();
  const trackedNames = manifest ? Object.keys(manifest.agents) : [];
  const availableAgents = getAvailableAgents();

  // Find blue-* files in project that match our available agents but aren't tracked
  const files = fs
    .readdirSync(projectAgentsDir)
    .filter((f) => f.startsWith("blue-") && f.endsWith(".md"));

  const orphaned: AgentInfo[] = [];
  for (const filename of files) {
    const matchingAgent = availableAgents.find((a) => a.filename === filename);
    if (matchingAgent && !trackedNames.includes(matchingAgent.name)) {
      orphaned.push(matchingAgent);
    }
  }

  return orphaned;
}

/**
 * Repair manifest by re-tracking orphaned agents
 */
export function repairManifest(): { repaired: string[]; removed: string[] } {
  const orphaned = findOrphanedAgents();
  const repaired: string[] = [];
  const removed: string[] = [];

  if (orphaned.length === 0) {
    return { repaired, removed };
  }

  // Get or create manifest
  let manifest = readManifest();
  if (!manifest) {
    manifest = createManifest(PACKAGE_VERSION);
  }

  // Add orphaned agents to manifest
  for (const agent of orphaned) {
    manifest = addAgentToManifest(manifest, agent.name, PACKAGE_VERSION);
    repaired.push(agent.name);
  }

  // Check for manifest entries that don't have files
  const projectAgentsDir = getProjectAgentsDir();
  const availableAgents = getAvailableAgents();

  for (const agentName of Object.keys(manifest.agents)) {
    const agent = availableAgents.find((a) => a.name === agentName);
    if (agent) {
      const filePath = path.join(projectAgentsDir, agent.filename);
      if (!fs.existsSync(filePath)) {
        manifest = removeAgentFromManifest(manifest, agentName);
        removed.push(agentName);
      }
    }
  }

  writeManifest(manifest);
  return { repaired, removed };
}
