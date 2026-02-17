#!/usr/bin/env node
import { program } from "commander";
// Note: ESM + NodeNext requires .js extensions in imports.
// TypeScript compiles .ts → .js, so imports must reference the compiled output.
import { interactiveMenu } from "./ui/menu.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { listCommand } from "./commands/list.js";
import { syncCommand } from "./commands/sync.js";
import { repairCommand } from "./commands/repair.js";
import { searchCommand } from "./commands/search.js";
import { profilesCommand } from "./commands/profiles.js";

program
  .name("blue-gardener")
  .description("Manage AI coding agents across multiple platforms")
  .version("0.1.0")
  .action(() => interactiveMenu());

program
  .command("add [agents...]")
  .description("Add one or more agents to your project")
  .option("-p, --profile <profileId>", "Install a preset profile of agents")
  .action((agents: string[], options: { profile?: string }) =>
    addCommand(agents, options)
  );

program
  .command("remove [agents...]")
  .description("Remove one or more agents from your project")
  .action(removeCommand);

program
  .command("list")
  .description("List available and installed agents")
  .action(listCommand);

program
  .command("search [query]")
  .description("Search agents by name, description, category, or tags")
  .action(searchCommand);

program
  .command("sync")
  .option("-s, --silent", "Run silently without output")
  .description("Sync installed agents to the latest version")
  .action(syncCommand);

program
  .command("repair")
  .description("Repair manifest by re-tracking orphaned agents")
  .action(repairCommand);

program
  .command("profiles")
  .description("List available agent install profiles")
  .action(profilesCommand);

program.parse();
