import chalk from "chalk";
import { repairManifest, findOrphanedAgents } from "../lib/agents.js";
import { readManifest } from "../lib/manifest.js";

export async function repairCommand(): Promise<void> {
  console.log(chalk.blue("Checking for issues...\n"));

  const orphaned = findOrphanedAgents();
  const manifest = readManifest();

  if (orphaned.length === 0 && manifest) {
    console.log(chalk.green("✓ No issues found. Manifest is healthy."));
    return;
  }

  if (orphaned.length > 0) {
    console.log(chalk.yellow(`Found ${orphaned.length} untracked agent(s):`));
    for (const agent of orphaned) {
      console.log(`    ${agent.name}`);
    }
    console.log();
  }

  if (!manifest) {
    console.log(chalk.yellow("Manifest file is missing.\n"));
  }

  console.log(chalk.blue("Repairing...\n"));

  const { repaired, removed } = repairManifest();

  if (repaired.length > 0) {
    console.log(chalk.green(`✓ Re-tracked ${repaired.length} agent(s):`));
    for (const name of repaired) {
      console.log(`    ${name}`);
    }
  }

  if (removed.length > 0) {
    console.log(
      chalk.yellow(`✓ Removed ${removed.length} stale manifest entry(ies):`)
    );
    for (const name of removed) {
      console.log(`    ${name}`);
    }
  }

  console.log(chalk.green("\n✓ Repair complete."));
}
