# CLI Reference

Complete reference for all Blue Gardener CLI commands.

## Installation

::: code-group

```bash [npm]
npm install -D blue-gardener
```

```bash [pnpm]
pnpm add -D blue-gardener
```

```bash [yarn]
yarn add -D blue-gardener
```

:::

## Commands

### Interactive Menu

Open the interactive menu:

::: code-group

```bash [npm]
npx blue-gardener
```

```bash [pnpm]
pnpm blue-gardener
```

```bash [yarn]
yarn blue-gardener
```

:::

### add

Add agents to your project.

**Interactive (category-based):**

::: code-group

```bash [npm]
npx blue-gardener add
```

```bash [pnpm]
pnpm blue-gardener add
```

```bash [yarn]
yarn blue-gardener add
```

:::

**Direct installation:**

::: code-group

```bash [npm]
npx blue-gardener add <agent-name> [<agent-name> ...]
```

```bash [pnpm]
pnpm blue-gardener add <agent-name> [<agent-name> ...]
```

```bash [yarn]
yarn blue-gardener add <agent-name> [<agent-name> ...]
```

:::

**Examples:**

::: code-group

```bash [npm]
# Add single agent
npx blue-gardener add blue-react-developer

# Add multiple agents
npx blue-gardener add blue-react-developer blue-frontend-code-reviewer
```

```bash [pnpm]
# Add single agent
pnpm blue-gardener add blue-react-developer

# Add multiple agents
pnpm blue-gardener add blue-react-developer blue-frontend-code-reviewer
```

```bash [yarn]
# Add single agent
yarn blue-gardener add blue-react-developer

# Add multiple agents
yarn blue-gardener add blue-react-developer blue-frontend-code-reviewer
```

:::

### remove

Remove agents from your project.

**Syntax:**

::: code-group

```bash [npm]
npx blue-gardener remove <agent-name> [<agent-name> ...]
```

```bash [pnpm]
pnpm blue-gardener remove <agent-name> [<agent-name> ...]
```

```bash [yarn]
yarn blue-gardener remove <agent-name> [<agent-name> ...]
```

:::

**Examples:**

::: code-group

```bash [npm]
# Remove single agent
npx blue-gardener remove blue-react-developer

# Remove multiple agents
npx blue-gardener remove blue-react-developer blue-frontend-code-reviewer
```

```bash [pnpm]
# Remove single agent
pnpm blue-gardener remove blue-react-developer

# Remove multiple agents
pnpm blue-gardener remove blue-react-developer blue-frontend-code-reviewer
```

```bash [yarn]
# Remove single agent
yarn blue-gardener remove blue-react-developer

# Remove multiple agents
yarn blue-gardener remove blue-react-developer blue-frontend-code-reviewer
```

:::

### list

List all installed agents and show available agents count.

**Syntax:**

::: code-group

```bash [npm]
npx blue-gardener list
```

```bash [pnpm]
pnpm blue-gardener list
```

```bash [yarn]
yarn blue-gardener list
```

:::

**Output:**

```
Platform: cursor

Installed agents (3):
  blue-react-developer (development)
  blue-frontend-code-reviewer (quality)
  blue-accessibility-specialist (quality)

Available agents: 44
```

### search

Search for agents by name, description, category, or tags.

**Syntax:**

::: code-group

```bash [npm]
npx blue-gardener search <query>
```

```bash [pnpm]
pnpm blue-gardener search <query>
```

```bash [yarn]
yarn blue-gardener search <query>
```

:::

**Examples:**

::: code-group

```bash [npm]
# Search by technology
npx blue-gardener search react

# Search by category
npx blue-gardener search testing

# Search by keyword
npx blue-gardener search security
```

```bash [pnpm]
# Search by technology
pnpm blue-gardener search react

# Search by category
pnpm blue-gardener search testing

# Search by keyword
pnpm blue-gardener search security
```

```bash [yarn]
# Search by technology
yarn blue-gardener search react

# Search by category
yarn blue-gardener search testing

# Search by keyword
yarn blue-gardener search security
```

:::

**Output:**

```
Found 3 agents matching "react":

blue-react-developer (development)
  React ecosystem specialist for components, hooks, patterns, and React Native

blue-storybook-specialist (development)
  Storybook configuration, efficient story writing, and component documentation

blue-blockchain-frontend-integrator (blockchain)
  Wallet connections, Web3 React hooks, and transaction UX
```

### sync

Update all installed agents to their latest versions.

**Syntax:**

::: code-group

```bash [npm]
npx blue-gardener sync
```

```bash [pnpm]
pnpm blue-gardener sync
```

```bash [yarn]
yarn blue-gardener sync
```

:::

Agents are also automatically synced when you update the Blue Gardener package.

### repair

Rebuild the manifest file by scanning for installed agents.

**Syntax:**

::: code-group

```bash [npm]
npx blue-gardener repair
```

```bash [pnpm]
pnpm blue-gardener repair
```

```bash [yarn]
yarn blue-gardener repair
```

:::

**When to use:**

- Manifest file deleted accidentally
- Agents installed manually
- Troubleshooting sync issues
- After migrating projects

### --version

Show the installed version of Blue Gardener.

**Syntax:**

::: code-group

```bash [npm]
npx blue-gardener --version
```

```bash [pnpm]
pnpm blue-gardener --version
```

```bash [yarn]
yarn blue-gardener --version
```

:::

### --help

Show help information for all commands.

**Syntax:**

::: code-group

```bash [npm]
npx blue-gardener --help
npx blue-gardener <command> --help
```

```bash [pnpm]
pnpm blue-gardener --help
pnpm blue-gardener <command> --help
```

```bash [yarn]
yarn blue-gardener --help
yarn blue-gardener <command> --help
```

:::

## Platform-Specific Behavior

### Multi-File Platforms

Cursor, Claude Desktop, OpenCode, Windsurf

- **add:** Creates individual `.md` files
- **remove:** Deletes the `.md` file
- **sync:** Updates each file independently

### Single-File Platforms

Codex, GitHub Copilot

- **add:** Appends section to combined file
- **remove:** Rebuilds file without that section
- **sync:** Regenerates entire file

## Exit Codes

| Code | Meaning           |
| ---- | ----------------- |
| 0    | Success           |
| 1    | Error (general)   |
| 2    | Invalid arguments |

## Next Steps

**[Getting Started →](/guide/getting-started)**  
Begin using Blue Gardener

**[Managing Agents →](/guide/managing-agents)**  
Learn more about agent management

**[Agent Catalog →](/agents/)**  
Browse all available agents
