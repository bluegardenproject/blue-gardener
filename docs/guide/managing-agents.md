# Managing Agents

Learn how to manage, update, and troubleshoot your installed agents.

## List Installed Agents

See which agents are currently installed:

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

**Output example:**

```
Platform: cursor

Installed agents (5):
  blue-react-developer (development)
  blue-state-management-expert (development)
  blue-frontend-code-reviewer (quality)
  blue-accessibility-specialist (quality)
  blue-feature-specification-analyst (orchestrator)

Available agents: 44
```

## Remove Agents

Remove agents you no longer need:

::: code-group

```bash [npm]
npx blue-gardener remove blue-react-developer
```

```bash [pnpm]
pnpm blue-gardener remove blue-react-developer
```

```bash [yarn]
yarn blue-gardener remove blue-react-developer
```

:::

**Platform-specific behavior:**

- **Multi-file (Cursor, Claude, etc.)**: Deletes the agent file
- **Single-file (Codex, Copilot)**: Rebuilds the combined file without that agent

## Search Agents

Find agents by name, description, category, or tags:

::: code-group

```bash [npm]
# Search for React-related agents
npx blue-gardener search react

# Search for testing agents
npx blue-gardener search testing

# Search by category
npx blue-gardener search quality
```

```bash [pnpm]
# Search for React-related agents
pnpm blue-gardener search react

# Search for testing agents
pnpm blue-gardener search testing

# Search by category
pnpm blue-gardener search quality
```

```bash [yarn]
# Search for React-related agents
yarn blue-gardener search react

# Search for testing agents
yarn blue-gardener search testing

# Search by category
yarn blue-gardener search quality
```

:::

**Output example:**

```
Found 3 agents matching "react":

blue-react-developer (development)
  React ecosystem specialist for components, hooks, patterns, and React Native

blue-storybook-specialist (development)
  Storybook configuration, efficient story writing, and component documentation

blue-blockchain-frontend-integrator (blockchain)
  Wallet connections, Web3 React hooks, and transaction UX
```

## Sync Agents

Update all installed agents to their latest versions:

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

**When to sync:**

- After updating Blue Gardener package
- When you want the latest agent improvements
- If agent files seem out of date

**Auto-sync:**

Agents are automatically synced when you update Blue Gardener:

::: code-group

```bash [npm]
npm update blue-gardener
# Agents will sync automatically on next CLI usage
```

```bash [pnpm]
pnpm update blue-gardener
# Agents will sync automatically on next CLI usage
```

```bash [yarn]
yarn upgrade blue-gardener
# Agents will sync automatically on next CLI usage
```

:::

## Repair Manifest

If your manifest file gets out of sync or deleted:

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

**What repair does:**

- Scans project for `blue-*` agent files
- Rebuilds the manifest file
- Re-tracks all found agents

**When to use repair:**

- Manifest file deleted accidentally
- Agents installed manually (outside Blue Gardener)
- Migration between projects
- Troubleshooting sync issues

## Interactive Menu

Access all management functions from one menu:

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

**Menu options:**

- Add agents
- Remove agents
- List installed agents
- Search agents
- Sync agents
- Repair manifest

## Troubleshooting

### Agents Not Showing Up

**Problem:** Added agents don't appear in your IDE

**Solutions:**

1. Restart your IDE
2. Check the platform-specific location
3. Run `npx blue-gardener list` to verify installation
4. Run `npx blue-gardener repair` to rebuild manifest

### Manifest Out of Sync

**Problem:** Manifest doesn't match actual files

**Solution:**

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

### Platform Detection Issues

**Problem:** Blue Gardener detects wrong platform

**Solution:**

1. Delete manifest file
2. Ensure correct platform directory exists
3. Run `npx blue-gardener add` and select platform manually

### Sync Fails

**Problem:** Sync command fails or shows errors

**Solutions:**

1. Check internet connection (if fetching updates)
2. Verify file permissions
3. Run `npx blue-gardener repair` after sync
4. Reinstall Blue Gardener: `npm install -D blue-gardener`

### Remove All Agents

To start fresh:

::: code-group

```bash [npm]
# List all agents
npx blue-gardener list

# Remove each agent
npx blue-gardener remove <agent-name>

# Or delete manifest and agent files manually
# Then repair if needed
npx blue-gardener repair
```

```bash [pnpm]
# List all agents
pnpm blue-gardener list

# Remove each agent
pnpm blue-gardener remove <agent-name>

# Or delete manifest and agent files manually
# Then repair if needed
pnpm blue-gardener repair
```

```bash [yarn]
# List all agents
yarn blue-gardener list

# Remove each agent
yarn blue-gardener remove <agent-name>

# Or delete manifest and agent files manually
# Then repair if needed
yarn blue-gardener repair
```

:::

## File Locations

### Multi-File Platforms

Agents stored as individual files:

- **Cursor:** `.cursor/agents/`
- **Claude Desktop:** `.claude/agents/`
- **OpenCode:** `.opencode/agents/`
- **Windsurf:** `.windsurf/rules/`

### Single-File Platforms

Agents combined in one file:

- **Codex:** `AGENTS.md` (root)
- **GitHub Copilot:** `.github/copilot-instructions.md`

### Manifest

- **Multi-file:** Same directory as agents (e.g., `.cursor/agents/.blue-generated-manifest.json`)
- **Single-file:** Root directory (`.blue-generated-manifest.json`)

## Next Steps

**[Orchestration →](/guide/orchestration)**  
Learn how agents work together

**[CLI Reference →](/reference/cli)**  
Complete command documentation

**[Agent Catalog →](/agents/)**  
Browse all available agents
