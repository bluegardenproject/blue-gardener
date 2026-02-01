# Blue Gardener 🌱

CLI tool to manage Cursor subagents - install, remove, and sync AI agents for your projects.

## Installation

```bash
npm install -D blue-gardener
```

## Usage

### Interactive Menu

```bash
npx blue-gardener
```

Opens an interactive menu to add, remove, list, or sync agents.

### Commands

```bash
# Add agents
npx blue-gardener add code-reviewer react-tailwind

# Remove agents
npx blue-gardener remove debugger

# List available and installed agents
npx blue-gardener list

# Sync installed agents to latest version
npx blue-gardener sync
```

## How It Works

Blue Gardener manages Cursor subagents by:

1. Bundling pre-configured agent `.md` files in the package
2. Copying selected agents to your project's `.cursor/agents/` directory
3. Tracking installed agents in a manifest file
4. Auto-syncing agents when the package is updated

## Auto-Sync

When you update the `blue-gardener` package, installed agents are automatically updated to their latest versions via the `postinstall` hook.

## License

MIT
