# Installation

Install Blue Gardener as a dev dependency in your project.

## Prerequisites

- Node.js 18 or higher
- npm, pnpm, or yarn package manager
- A project using one of the supported AI platforms

## Install

Choose your package manager:

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

## Verify Installation

Check that Blue Gardener is installed correctly:

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

You should see the version number (e.g., `0.1.0`).

## What Gets Installed

After installation, your `package.json` will include:

```json
{
  "devDependencies": {
    "blue-gardener": "^0.1.0"
  }
}
```

Blue Gardener does not install any agents yet - you'll select and add them in the next step.

## Platform Detection

Blue Gardener automatically detects your platform based on your project structure:

| Directory/File                    | Platform Detected |
| --------------------------------- | ----------------- |
| `.cursor/agents/`                 | Cursor            |
| `.claude/agents/`                 | Claude Desktop    |
| `.windsurf/`                      | Windsurf          |
| `.opencode/agents/`               | OpenCode          |
| `.github/copilot-instructions.md` | GitHub Copilot    |
| `AGENTS.md`                       | Codex             |

If no platform is detected, Blue Gardener will prompt you to select one on first use.

## Updating Blue Gardener

To update to the latest version:

::: code-group

```bash [npm]
npm update blue-gardener
```

```bash [pnpm]
pnpm update blue-gardener
```

```bash [yarn]
yarn upgrade blue-gardener
```

:::

Installed agents will automatically sync to their latest versions when you update Blue Gardener.

## Uninstalling

To remove Blue Gardener and all installed agents:

::: code-group

```bash [npm]
# Remove all agents first (optional)
npx blue-gardener list
# Then uninstall
npm uninstall blue-gardener
```

```bash [pnpm]
# Remove all agents first (optional)
pnpm blue-gardener list
# Then uninstall
pnpm remove blue-gardener
```

```bash [yarn]
# Remove all agents first (optional)
yarn blue-gardener list
# Then uninstall
yarn remove blue-gardener
```

:::

Note: This does not remove agent files from your project. Use `blue-gardener remove` to clean up agents before uninstalling.

## Next Steps

Now that Blue Gardener is installed:

**[First Steps →](/guide/first-steps)**  
Add your first agents

**[Platforms →](/guide/platforms)**  
Learn about platform-specific behavior
