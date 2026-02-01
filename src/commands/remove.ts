import chalk from "chalk";
import { checkbox } from "@inquirer/prompts";
import { getInstalledAgents, removeAgent } from "../lib/agents.js";

export async function removeCommand(agents?: string[]): Promise<void> {
  const installedAgents = getInstalledAgents();

  if (installedAgents.length === 0) {
    console.log(chalk.yellow("No agents installed."));
    return;
  }

  let agentsToRemove: string[];

  if (agents && agents.length > 0) {
    // Use provided agent names
    const installedNames = installedAgents.map((a) => a.name);
    agentsToRemove = agents.filter((name) => installedNames.includes(name));

    const notInstalled = agents.filter(
      (name) => !installedNames.includes(name)
    );
    if (notInstalled.length > 0) {
      console.log(chalk.yellow(`Not installed: ${notInstalled.join(", ")}`));
    }
  } else {
    // Interactive selection
    agentsToRemove = await checkbox({
      message:
        "Select agents to remove (↑↓ to navigate, space to select, enter to confirm):",
      choices: installedAgents.map((agent) => ({
        name: agent.category ? `${agent.name} [${agent.category}]` : agent.name,
        value: agent.name,
        description: agent.description,
      })),
    });
  }

  if (agentsToRemove.length === 0) {
    console.log(chalk.yellow("No agents selected."));
    return;
  }

  // Remove selected agents
  for (const name of agentsToRemove) {
    const success = removeAgent(name);
    if (success) {
      console.log(chalk.green(`✓ Removed ${name}`));
    } else {
      console.log(chalk.red(`✗ Failed to remove ${name}`));
    }
  }
}
