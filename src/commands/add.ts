import chalk from "chalk";
import { checkbox } from "@inquirer/prompts";
import {
  getAvailableAgents,
  installAgent,
  getInstalledAgents,
} from "../lib/agents.js";

export async function addCommand(agents?: string[]): Promise<void> {
  const availableAgents = getAvailableAgents();
  const installedAgents = getInstalledAgents();
  const installedNames = installedAgents.map((a) => a.name);

  if (availableAgents.length === 0) {
    console.log(chalk.yellow("No agents available to install."));
    return;
  }

  // Filter out already installed agents
  const notInstalled = availableAgents.filter(
    (a) => !installedNames.includes(a.name)
  );

  if (notInstalled.length === 0) {
    console.log(chalk.green("All available agents are already installed."));
    return;
  }

  let agentsToInstall: string[];

  if (agents && agents.length > 0) {
    // Use provided agent names
    agentsToInstall = agents.filter((name) =>
      notInstalled.some((a) => a.name === name)
    );

    const invalid = agents.filter(
      (name) => !availableAgents.some((a) => a.name === name)
    );
    if (invalid.length > 0) {
      console.log(
        chalk.yellow(`Unknown agents: ${invalid.join(", ")}`)
      );
    }

    const alreadyInstalled = agents.filter((name) =>
      installedNames.includes(name)
    );
    if (alreadyInstalled.length > 0) {
      console.log(
        chalk.yellow(`Already installed: ${alreadyInstalled.join(", ")}`)
      );
    }
  } else {
    // Interactive selection
    agentsToInstall = await checkbox({
      message: "Select agents to install:",
      choices: notInstalled.map((agent) => ({
        name: `${agent.name} - ${agent.description}`,
        value: agent.name,
      })),
    });
  }

  if (agentsToInstall.length === 0) {
    console.log(chalk.yellow("No agents selected."));
    return;
  }

  // Install selected agents
  for (const name of agentsToInstall) {
    const success = installAgent(name);
    if (success) {
      console.log(chalk.green(`✓ Installed ${name}`));
    } else {
      console.log(chalk.red(`✗ Failed to install ${name}`));
    }
  }
}
