import chalk from "chalk";
import { input } from "@inquirer/prompts";
import { getAvailableAgents, getInstalledAgents } from "../lib/agents.js";

/**
 * Search agents by name, description, category, or tags
 */
function searchAgents(query: string) {
  const availableAgents = getAvailableAgents();
  const lowerQuery = query.toLowerCase();

  return availableAgents.filter((agent) => {
    // Search in name
    if (agent.name.toLowerCase().includes(lowerQuery)) return true;
    // Search in description
    if (agent.description.toLowerCase().includes(lowerQuery)) return true;
    // Search in category
    if (agent.category.toLowerCase().includes(lowerQuery)) return true;
    // Search in tags
    if (agent.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
      return true;
    return false;
  });
}

/**
 * Highlight matching text in a string
 */
function highlightMatch(text: string, query: string): string {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return `${before}${chalk.bgYellow.black(match)}${after}`;
}

export async function searchCommand(query?: string): Promise<void> {
  const installedAgents = getInstalledAgents();
  const installedNames = installedAgents.map((a) => a.name);

  // Get query interactively if not provided
  let searchQuery = query;
  if (!searchQuery) {
    searchQuery = await input({
      message: "Search agents:",
    });
  }

  if (!searchQuery.trim()) {
    console.log(chalk.yellow("Please provide a search term."));
    return;
  }

  const results = searchAgents(searchQuery);

  if (results.length === 0) {
    console.log(chalk.yellow(`No agents found matching "${searchQuery}"`));
    return;
  }

  console.log(
    chalk.bold(
      `\nFound ${results.length} agent(s) matching "${searchQuery}":\n`
    )
  );

  for (const agent of results) {
    const isInstalled = installedNames.includes(agent.name);
    const status = isInstalled
      ? chalk.green(" [installed]")
      : chalk.dim(" [not installed]");

    // Highlight matches in name
    const displayName = highlightMatch(agent.name, searchQuery);
    console.log(`  ${chalk.cyan(displayName)}${status}`);

    // Show category and tags with highlighting
    if (agent.category) {
      const displayCategory = highlightMatch(agent.category, searchQuery);
      const displayTags = agent.tags
        .map((tag) => highlightMatch(tag, searchQuery))
        .join(", ");
      console.log(
        `    ${chalk.yellow(`[${displayCategory}]`)} ${displayTags ? chalk.dim(displayTags) : ""}`
      );
    }

    // Show description with highlighting
    if (agent.description) {
      const displayDesc = highlightMatch(agent.description, searchQuery);
      console.log(`    ${chalk.dim(displayDesc)}`);
    }
    console.log();
  }

  console.log(
    chalk.dim(`Tip: Use "npx blue-gardener add <agent-name>" to install`)
  );
}
