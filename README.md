# Blue Gardener

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

Opens an interactive menu to add, remove, list, sync, or repair agents.

### Commands

```bash
# Add agents (interactive selection)
npx blue-gardener add

# Add specific agents
npx blue-gardener add blue-github-actions-specialist blue-typescript-cli-developer

# Remove agents
npx blue-gardener remove blue-github-actions-specialist

# List available and installed agents
npx blue-gardener list

# Sync installed agents to latest version
npx blue-gardener sync

# Repair manifest (re-track orphaned agents)
npx blue-gardener repair
```

## Available Agents

| Agent                            | Category       | Description                                                        |
| -------------------------------- | -------------- | ------------------------------------------------------------------ |
| `blue-github-actions-specialist` | infrastructure | GitHub Actions and workflow specialist for CI/CD pipelines         |
| `blue-typescript-cli-developer`  | development    | TypeScript CLI tool development with complexity-aware architecture |

## How It Works

Blue Gardener manages Cursor subagents by:

1. Bundling pre-configured agent `.md` files in the package
2. Copying selected agents to your project's `.cursor/agents/` directory
3. Tracking installed agents in `.blue-generated-manifest.json`
4. Auto-syncing agents when the package is updated

### File Structure

After installing agents, your project will have:

```
your-project/
├── .cursor/
│   └── agents/
│       ├── .blue-generated-manifest.json  # Tracks installed agents
│       ├── blue-github-actions-specialist.md
│       └── blue-typescript-cli-developer.md
└── ...
```

## Auto-Sync

When you update the `blue-gardener` package, installed agents are automatically updated to their latest versions.

## Troubleshooting

If you accidentally delete the manifest file or agents get out of sync:

```bash
npx blue-gardener repair
```

This will re-detect and re-track any `blue-*` agent files in your project.

## License

MIT
