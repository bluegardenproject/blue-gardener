import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { addCommand } from "../commands/add.js";
import { removeCommand } from "../commands/remove.js";
import { listCommand } from "../commands/list.js";
import { syncCommand } from "../commands/sync.js";
import { repairCommand } from "../commands/repair.js";

type MenuAction = "add" | "remove" | "list" | "sync" | "repair" | "exit";

export async function interactiveMenu(): Promise<void> {
  console.log(chalk.blue.bold("\n🌱 Blue Gardener - Cursor Agent Manager\n"));

  while (true) {
    const action = await select<MenuAction>({
      message: "What would you like to do?",
      choices: [
        {
          name: "Add agents",
          value: "add",
          description: "Install new agents to your project",
        },
        {
          name: "Remove agents",
          value: "remove",
          description: "Remove installed agents",
        },
        {
          name: "List agents",
          value: "list",
          description: "Show available and installed agents",
        },
        {
          name: "Sync agents",
          value: "sync",
          description: "Update installed agents to latest version",
        },
        {
          name: "Repair manifest",
          value: "repair",
          description: "Fix issues with manifest or orphaned agents",
        },
        {
          name: "Exit",
          value: "exit",
          description: "Exit Blue Gardener",
        },
      ],
    });

    console.log();

    switch (action) {
      case "add":
        await addCommand();
        break;
      case "remove":
        await removeCommand();
        break;
      case "list":
        await listCommand();
        break;
      case "sync":
        await syncCommand();
        break;
      case "repair":
        await repairCommand();
        break;
      case "exit":
        console.log(chalk.blue("Goodbye! 🌱\n"));
        return;
    }

    console.log();
  }
}
