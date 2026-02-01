#!/usr/bin/env node
import { program } from "commander";
import { interactiveMenu } from "./ui/menu.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { listCommand } from "./commands/list.js";
import { syncCommand } from "./commands/sync.js";

program
  .name("blue-gardener")
  .description("Manage Cursor subagents for your project")
  .version("0.1.0")
  .action(() => interactiveMenu());

program
  .command("add [agents...]")
  .description("Add one or more agents to your project")
  .action(addCommand);

program
  .command("remove [agents...]")
  .description("Remove one or more agents from your project")
  .action(removeCommand);

program
  .command("list")
  .description("List available and installed agents")
  .action(listCommand);

program
  .command("sync")
  .option("-s, --silent", "Run silently without output")
  .description("Sync installed agents to the latest version")
  .action(syncCommand);

program.parse();
