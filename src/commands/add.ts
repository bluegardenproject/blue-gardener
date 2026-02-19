import chalk from "chalk";
import { checkbox, select } from "@inquirer/prompts";
import {
  getAvailableAgents,
  installAgent,
  getInstalledAgents,
  getCategories,
  getAgentsByCategory,
  addPlatformAndSyncAgents,
} from "../lib/agents.js";
import { getProfiles, getProfile } from "../lib/profiles.js";
import {
  detectPlatform,
  promptForPlatform,
  getPlatformInfo,
  parsePlatform,
} from "../lib/platform.js";
import { readManifest, getEnabledPlatforms } from "../lib/manifest.js";

export async function addCommand(
  agents?: string[],
  options?: { profile?: string; platform?: string }
): Promise<void> {
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

  if (notInstalled.length === 0 && !options?.platform) {
    console.log(chalk.green("All available agents are already installed."));
    return;
  }

  let agentsToInstall: string[] = [];

  if (notInstalled.length > 0) {
    if (options?.profile) {
      const profile = getProfile(options.profile);
      if (!profile) {
        console.log(
          chalk.yellow(
            `Unknown profile: ${options.profile}. Run "npx blue-gardener profiles" to see available profiles.`
          )
        );
        return;
      }

      const requested = profile.agentNames;
      const known = requested.filter((name) =>
        availableAgents.some((a) => a.name === name)
      );
      const missing = requested.filter(
        (name) => !availableAgents.some((a) => a.name === name)
      );

      if (missing.length > 0) {
        console.log(
          chalk.yellow(
            `Profile contains unknown agents (skipping): ${missing.join(", ")}`
          )
        );
      }

      agentsToInstall = known.filter((name) =>
        notInstalled.some((a) => a.name === name)
      );

      const alreadyInstalled = known.filter((name) =>
        installedNames.includes(name)
      );
      if (alreadyInstalled.length > 0) {
        console.log(
          chalk.dim(
            `Already installed (profile): ${alreadyInstalled.join(", ")}`
          )
        );
      }
    } else if (agents && agents.length > 0) {
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
      // Interactive selection: profile vs category
      const installMode = await select({
        message: "Install agents by:",
        choices: [
          {
            name: "Profile preset (recommended)",
            value: "profile",
            description: "Install a curated set of agents for a project type",
          },
          {
            name: "Category browse",
            value: "category",
            description: "Pick individual agents from a category",
          },
        ],
      });

      if (installMode === "profile") {
        const profiles = getProfiles();
        const selectedProfileId = await select({
          message: "Select a profile:",
          choices: profiles.map((p) => ({
            name: `${p.name} (${p.agentNames.length} agents)`,
            value: p.id,
            description: p.description,
          })),
        });

        const profile = getProfile(selectedProfileId)!;
        const profileAgents = profile.agentNames
          .map((name) => availableAgents.find((a) => a.name === name))
          .filter(Boolean)
          .filter((a) => notInstalled.some((na) => na.name === a!.name));

        if (profileAgents.length === 0) {
          console.log(
            chalk.green(
              `All agents in "${profile.name}" are already installed.`
            )
          );
          return;
        }

        agentsToInstall = await checkbox({
          message: `Select agents to install (${profile.name}):`,
          choices: profileAgents.map((agent) => ({
            name: agent!.name,
            value: agent!.name,
            description: agent!.description,
          })),
        });
      } else {
        // Category browse
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
        const categoryAgents = getAgentsByCategory(selectedCategory).filter(
          (a) => notInstalled.some((na) => na.name === a.name)
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
    }
  }

  if (agentsToInstall.length === 0 && !options?.platform) {
    console.log(chalk.yellow("No agents selected."));
    return;
  }

  // Step 3: Ensure platform configuration exists and optionally add a platform
  let manifest = readManifest();

  if (options?.platform) {
    const requestedPlatform = parsePlatform(options.platform);
    if (!requestedPlatform) {
      console.log(chalk.red(`Unknown platform: ${options.platform}`));
      return;
    }

    const addResult = addPlatformAndSyncAgents(requestedPlatform);
    if (addResult.alreadyEnabled) {
      const info = getPlatformInfo(requestedPlatform);
      console.log(chalk.dim(`${info.name} is already enabled.`));
    } else {
      const info = getPlatformInfo(requestedPlatform);
      console.log(chalk.green(`✓ Added platform: ${info.name}`));
      if (addResult.synced.length > 0) {
        console.log(
          chalk.green(
            `✓ Synced ${addResult.synced.length} existing agent(s) to ${info.name}`
          )
        );
      }
      if (addResult.failed.length > 0) {
        console.log(
          chalk.yellow(
            `Could not sync ${addResult.failed.length} agent(s) to ${info.name}`
          )
        );
      }
    }

    manifest = readManifest() ?? manifest;
  }

  if (getEnabledPlatforms(manifest).length === 0) {
    let platform = detectPlatform();

    // First time - prompt for platform if detection fails
    console.log(
      chalk.cyan(
        "\nWelcome to Blue Gardener! Let's set up your platform configuration."
      )
    );
    if (!platform) {
      platform = await promptForPlatform();
    }

    addPlatformAndSyncAgents(platform);

    const platformInfo = getPlatformInfo(platform);
    console.log(chalk.green(`\n✓ Platform set to: ${platformInfo.name}\n`));
  }

  // Step 4: Install selected agents
  for (const name of agentsToInstall) {
    const success = installAgent(name);
    if (success) {
      console.log(chalk.green(`✓ Installed ${name}`));
    } else {
      console.log(chalk.red(`✗ Failed to install ${name}`));
    }
  }
}
