import chalk from "chalk";
import { getAvailableAgents, getInstalledAgents } from "../lib/agents.js";

export async function listCommand(): Promise<void> {
  const availableAgents = getAvailableAgents();
  const installedAgents = getInstalledAgents();
  const installedNames = installedAgents.map((a) => a.name);

  if (availableAgents.length === 0) {
    console.log(chalk.yellow("No agents available."));
    return;
  }

  console.log(chalk.bold("\nAvailable Agents:\n"));

  for (const agent of availableAgents) {
    const isInstalled = installedNames.includes(agent.name);
    const status = isInstalled
      ? chalk.green(" [installed]")
      : chalk.dim(" [not installed]");

    console.log(`  ${chalk.cyan(agent.name)}${status}`);
    if (agent.description) {
      console.log(`    ${chalk.dim(agent.description)}`);
    }
    console.log();
  }

  console.log(
    chalk.dim(
      `Total: ${availableAgents.length} available, ${installedAgents.length} installed`
    )
  );
}
