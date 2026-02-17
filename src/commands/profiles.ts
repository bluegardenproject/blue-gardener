import chalk from "chalk";
import { getProfiles } from "../lib/profiles.js";

export async function profilesCommand(): Promise<void> {
  const profiles = getProfiles();

  console.log(chalk.bold("\nAgent Profiles:\n"));

  for (const p of profiles) {
    console.log(
      `  ${chalk.cyan(p.id)} ${chalk.dim(`(${p.agentNames.length} agents)`)}`
    );
    console.log(`    ${chalk.dim(p.name)} — ${chalk.dim(p.description)}`);
    console.log();
  }
}
