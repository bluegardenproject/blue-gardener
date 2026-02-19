import chalk from "chalk";
import { addPlatformAndSyncAgents } from "../lib/agents.js";
import { readManifest, getEnabledPlatforms } from "../lib/manifest.js";
import {
  PLATFORMS,
  getPlatformInfo,
  getAvailablePlatformsToAdd,
  parsePlatform,
  promptForPlatform,
  type Platform,
} from "../lib/platform.js";

export async function platformAddCommand(platformArg?: string): Promise<void> {
  const manifest = readManifest();
  const enabledPlatforms = getEnabledPlatforms(manifest);

  let targetPlatform: Platform;
  if (platformArg) {
    const parsed = parsePlatform(platformArg);
    if (!parsed) {
      console.log(chalk.red(`Unknown platform: ${platformArg}`));
      console.log(
        chalk.dim(
          `Available: ${PLATFORMS.map((platform) => platform.id).join(", ")}`
        )
      );
      return;
    }
    targetPlatform = parsed;
  } else {
    const availableToAdd = getAvailablePlatformsToAdd(enabledPlatforms);
    if (availableToAdd.length === 0) {
      console.log(chalk.green("All platforms are already enabled."));
      return;
    }
    targetPlatform = await promptForPlatform({
      exclude: enabledPlatforms,
      message: "Which platform would you like to add?",
    });
  }

  const result = addPlatformAndSyncAgents(targetPlatform);
  const platformInfo = getPlatformInfo(targetPlatform);

  if (result.alreadyEnabled) {
    console.log(chalk.yellow(`${platformInfo.name} is already enabled.`));
    return;
  }

  console.log(chalk.green(`✓ Added platform: ${platformInfo.name}`));

  if (result.synced.length > 0) {
    console.log(
      chalk.green(
        `✓ Synced ${result.synced.length} existing agent(s) to ${platformInfo.name}`
      )
    );
  }

  if (result.failed.length > 0) {
    console.log(
      chalk.yellow(
        `Could not sync ${result.failed.length} agent(s) to ${platformInfo.name}: ${result.failed.join(", ")}`
      )
    );
  }
}
