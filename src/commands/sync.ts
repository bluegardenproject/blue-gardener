import chalk from "chalk";
import { syncAgents, getInstalledAgents } from "../lib/agents.js";

interface SyncOptions {
  silent?: boolean;
}

export async function syncCommand(options: SyncOptions = {}): Promise<void> {
  const installedAgents = getInstalledAgents();

  if (installedAgents.length === 0) {
    if (!options.silent) {
      console.log(chalk.yellow("No agents installed to sync."));
    }
    return;
  }

  const { synced, failed } = syncAgents();

  if (options.silent) {
    return;
  }

  if (synced.length > 0) {
    console.log(chalk.green(`✓ Synced ${synced.length} agent(s):`));
    for (const name of synced) {
      console.log(`    ${name}`);
    }
  }

  if (failed.length > 0) {
    console.log(chalk.red(`✗ Failed to sync ${failed.length} agent(s):`));
    for (const name of failed) {
      console.log(`    ${name}`);
    }
  }

  if (synced.length === 0 && failed.length === 0) {
    console.log(chalk.dim("All agents are up to date."));
  }
}
