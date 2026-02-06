import chalk from "chalk";
import { checkbox, select } from "@inquirer/prompts";
import {
  getAvailableAgents,
  installAgent,
  getInstalledAgents,
  getCategories,
  getAgentsByCategory,
} from "../lib/agents.js";
import {
  detectPlatform,
  promptForPlatform,
  getPlatformInfo,
} from "../lib/platform.js";
import {
  readManifest,
  writeManifest,
  updatePlatform,
} from "../lib/manifest.js";

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
      console.log(chalk.yellow(`Unknown agents: ${invalid.join(", ")}`));
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
    // Interactive selection with categories
    const categories = getCategories();

    // Step 1: Select category
    const selectedCategory = await select({
      message: "Select a category:",
      choices: categories.map((cat) => ({
        name: `${cat.name} (${cat.count} ${cat.count === 1 ? "agent" : "agents"})`,
        value: cat.id,
      })),
    });

    // Step 2: Select agents from category
    const categoryAgents = getAgentsByCategory(selectedCategory).filter((a) =>
      notInstalled.some((na) => na.name === a.name)
    );

    if (categoryAgents.length === 0) {
      console.log(
        chalk.green(
          `All agents in ${selectedCategory} category are already installed.`
        )
      );
      return;
    }

    agentsToInstall = await checkbox({
      message: `Select agents to install (${selectedCategory}):`,
      choices: categoryAgents.map((agent) => ({
        name: agent.name,
        value: agent.name,
        description: agent.description,
      })),
    });
  }

  if (agentsToInstall.length === 0) {
    console.log(chalk.yellow("No agents selected."));
    return;
  }

  // Step 3: Platform detection/prompt (on first use)
  let manifest = readManifest();
  let platform = manifest?.platform || detectPlatform();

  if (!platform) {
    // First time - prompt for platform
    console.log(
      chalk.cyan(
        "\nWelcome to Blue Gardener! Let's set up your platform configuration."
      )
    );
    platform = await promptForPlatform();

    // Update manifest with platform
    if (manifest) {
      manifest = updatePlatform(manifest, platform);
      writeManifest(manifest);
    }

    const platformInfo = getPlatformInfo(platform);
    console.log(chalk.green(`\n✓ Platform set to: ${platformInfo.name}\n`));
  }

  // Step 4: Install selected agents
  for (const name of agentsToInstall) {
    const success = installAgent(name, platform);
    if (success) {
      console.log(chalk.green(`✓ Installed ${name}`));
    } else {
      console.log(chalk.red(`✗ Failed to install ${name}`));
    }
  }
}
