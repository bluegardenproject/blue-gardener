# First Steps

Get started with Blue Gardener by adding your first agents.

## Run the Interactive Menu

The easiest way to use Blue Gardener is through the interactive menu:

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

This opens a menu with options:

- Add agents
- Remove agents
- List installed agents
- Search agents
- Sync agents
- Repair manifest

## Platform Selection (First Time Only)

If Blue Gardener can't auto-detect your platform, you'll see:

```
? Which platform are you using?
  > Cursor
    Claude Desktop
    Codex
    GitHub Copilot
    Windsurf
    OpenCode
```

Select your platform using arrow keys and Enter. This choice is saved for future use.

## Adding Your First Agents

### Method 1: Interactive Selection (Recommended)

Run the add command:

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

**Step 1: Select a category**

```
? Select a category:
  > Orchestrators (5 agents)
    Development (9 agents)
    Quality (9 agents)
    Infrastructure (9 agents)
    Configuration (1 agent)
    Blockchain (11 agents)
```

**Step 2: Select agents**

```
? Select agents to install:
  ◯ blue-feature-specification-analyst
  ◯ blue-architecture-designer
  ◯ blue-refactoring-strategy-planner
  ◯ blue-app-quality-gate-keeper
  ◯ blue-implementation-review-coordinator
```

Use Space to select, Enter to confirm.

### Method 2: Direct Installation

Install specific agents by name:

::: code-group

```bash [npm]
npx blue-gardener add blue-react-developer blue-code-reviewer
```

```bash [pnpm]
pnpm blue-gardener add blue-react-developer blue-code-reviewer
```

```bash [yarn]
yarn blue-gardener add blue-react-developer blue-code-reviewer
```

:::

## Recommended Starting Agents

### For Frontend Projects

```bash
blue-react-developer
blue-state-management-expert
blue-ui-styling-specialist
blue-frontend-code-reviewer
blue-accessibility-specialist
```

### For Backend Projects

```bash
blue-node-backend-implementation-specialist
blue-database-architecture-specialist
blue-node-backend-code-reviewer
blue-security-specialist
```

### For Any Project

```bash
blue-feature-specification-analyst
blue-architecture-designer
blue-implementation-review-coordinator
```

## Verify Installation

List installed agents:

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

Output shows:

```
Installed agents (3):
  blue-react-developer (development)
  blue-frontend-code-reviewer (quality)
  blue-accessibility-specialist (quality)

Available agents: 44
```

## Using Agents in Your IDE

### Cursor

Invoke agents with `@` symbol:

```
@blue-react-developer Please create a login form component
```

### Claude Desktop

Similar to Cursor:

```
@blue-react-developer Please create a login form component
```

### Other Platforms

Agents are installed as instructions/rules. Refer to your platform's documentation for invocation.

## File Structure

After installing agents, your project structure looks like:

### Multi-File Platforms (Cursor, Claude, OpenCode, Windsurf)

```
your-project/
├── .cursor/agents/          # Cursor
│   ├── .blue-generated-manifest.json
│   ├── blue-react-developer.md
│   └── blue-frontend-code-reviewer.md
```

### Single-File Platforms (Codex, Copilot)

```
your-project/
├── AGENTS.md                # Codex
```

or

```
your-project/
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot
```

## Next Steps

**[Adding Agents →](/guide/adding-agents)**  
Learn more about finding and adding agents

**[Managing Agents →](/guide/managing-agents)**  
Remove, search, sync, and repair agents

**[Agent Catalog →](/agents/)**  
Browse all 44 available agents
