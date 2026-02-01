import fs from "fs";
import { getManifestPath, ensureProjectAgentsDir } from "./paths.js";

export interface AgentEntry {
  version: string;
  installedAt: string;
}

export interface Manifest {
  version: string;
  installedAt: string;
  agents: Record<string, AgentEntry>;
}

/**
 * Read the manifest file, returns null if it doesn't exist
 */
export function readManifest(): Manifest | null {
  const manifestPath = getManifestPath();
  if (!fs.existsSync(manifestPath)) {
    return null;
  }
  const content = fs.readFileSync(manifestPath, "utf-8");
  return JSON.parse(content) as Manifest;
}

/**
 * Write the manifest file
 */
export function writeManifest(manifest: Manifest): void {
  ensureProjectAgentsDir();
  const manifestPath = getManifestPath();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

/**
 * Create a new empty manifest
 */
export function createManifest(version: string): Manifest {
  return {
    version,
    installedAt: new Date().toISOString(),
    agents: {},
  };
}

/**
 * Add an agent to the manifest
 */
export function addAgentToManifest(
  manifest: Manifest,
  agentName: string,
  version: string
): Manifest {
  return {
    ...manifest,
    agents: {
      ...manifest.agents,
      [agentName]: {
        version,
        installedAt: new Date().toISOString(),
      },
    },
  };
}

/**
 * Remove an agent from the manifest
 */
export function removeAgentFromManifest(
  manifest: Manifest,
  agentName: string
): Manifest {
  const { [agentName]: _, ...remainingAgents } = manifest.agents;
  return {
    ...manifest,
    agents: remainingAgents,
  };
}

/**
 * Get list of installed agent names
 */
export function getInstalledAgentNames(): string[] {
  const manifest = readManifest();
  if (!manifest) {
    return [];
  }
  return Object.keys(manifest.agents);
}
