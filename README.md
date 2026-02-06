# Blue Gardener

CLI tool to manage AI coding agents across multiple platforms - install, remove, and sync specialized AI agents for your projects.

## Supported Platforms

Blue Gardener works with:

- **Cursor** - Native agent support in `.cursor/agents/`
- **Claude Desktop** - MCP agents in `.claude/agents/`
- **Codex** - OpenAI Codex with `AGENTS.md` file
- **GitHub Copilot** - Custom instructions in `.github/copilot-instructions.md`
- **Windsurf** - Cascade rules in `.windsurf/rules/`
- **OpenCode** - Custom agents in `.opencode/agents/`

## Installation

```bash
npm install -D blue-gardener
```

## Usage

### First Time Setup

When you run `add` for the first time, Blue Gardener will detect your platform or prompt you to select one:

```bash
npx blue-gardener add

# If platform not detected, you'll see:
? Which platform are you using?
  > Cursor
    Claude Desktop
    Codex
    GitHub Copilot
    Windsurf
    OpenCode
```

Your choice is saved and used for all future operations.

### Interactive Menu

```bash
npx blue-gardener
```

Opens an interactive menu to add, remove, list, sync, or repair agents.

### Commands

```bash
# Add agents (interactive with category selection)
npx blue-gardener add

# Add specific agents directly
npx blue-gardener add blue-github-actions-specialist blue-react-developer

# Remove agents
npx blue-gardener remove blue-github-actions-specialist

# List available and installed agents
npx blue-gardener list

# Search agents by name, description, category, or tags
npx blue-gardener search react
npx blue-gardener search testing

# Sync installed agents to latest version
npx blue-gardener sync

# Repair manifest (re-track orphaned agents)
npx blue-gardener repair
```

### Category-Based Selection

When adding agents interactively, you'll first select a category:

```
? Select a category:
  > Orchestrators (4 agents)
    Development (9 agents)
    Quality (9 agents)
    Infrastructure (9 agents)
    Configuration (1 agent)
    Blockchain (11 agents)
```

Then select specific agents from that category.

## Available Agents

Blue Gardener includes 44 specialized agents across several categories:

- **Orchestrators** (5) - Planning, coordination, and quality assurance
- **Development** (9) - React, state management, styling, API integration
- **Quality** (9) - Code review, testing, accessibility, performance, security
- **Infrastructure** (9) - GitHub Actions, CLI development, databases, Docker
- **Configuration** (1) - Multi-platform AI setup
- **Blockchain** (11) - Smart contracts, DeFi, Web3 integration

See the full [Agent Catalog](./agents/CATALOG.md) for detailed descriptions.

## How Agents Work Together

Blue Gardener agents collaborate through **orchestration patterns**:

### Orchestrators

High-level coordinators that manage workflows and delegate to specialists:

| Orchestrator                             | Purpose                                                      |
| ---------------------------------------- | ------------------------------------------------------------ |
| `blue-feature-specification-analyst`     | Requirements clarification & implementation planning         |
| `blue-architecture-designer`             | Technical strategy & component design                        |
| `blue-refactoring-strategy-planner`      | Large refactoring & migration planning                       |
| `blue-app-quality-gate-keeper`           | Comprehensive quality audits                                 |
| `blue-implementation-review-coordinator` | Post-implementation quality verification with feedback loops |

### Specialists

Domain experts focused on specific implementation areas (development, quality, infrastructure, blockchain).

### Example: Feature Development Flow

```
User: "Build a user authentication feature"

1. @blue-feature-specification-analyst
   → Clarifies requirements, creates implementation plan

2. @blue-architecture-designer
   → Designs technical approach, selects technologies

3. Implementation Specialists (parallel)
   → @blue-react-developer (components)
   → @blue-state-management-expert (auth state)
   → @blue-api-integration-expert (auth API)

4. @blue-implementation-review-coordinator
   → Quality review with feedback loops
   → Routes fixes to specialists
   → Final sign-off when standards met
```

**For detailed orchestration patterns and workflows, see the [Orchestration Guide](./ORCHESTRATION_GUIDE.md).**

## How It Works

Blue Gardener adapts agents to your platform's format:

1. **Platform Detection** - Automatically detects your platform or prompts on first use
2. **Agent Transformation** - Converts agent definitions to platform-specific format
3. **Smart Installation** - Places files where your platform expects them
4. **Manifest Tracking** - Tracks installed agents in `.cursor/agents/.blue-generated-manifest.json`

### Platform-Specific Behavior

#### Multi-File Platforms (Cursor, Claude Desktop, OpenCode, Windsurf)

Each agent is installed as a separate file:

```
.cursor/agents/
├── blue-react-developer.md
├── blue-code-reviewer.md
└── ...
```

#### Single-File Platforms (Codex, GitHub Copilot)

All agents are combined into one file with sections:

```markdown
# Blue Gardener AI Agents

## React Developer Agent

[agent content...]

---

## Code Reviewer Agent

[agent content...]
```

### File Structure

After installing agents, your project will have:

```
your-project/
├── .cursor/
│   └── agents/
│       ├── .blue-generated-manifest.json  # Tracks installed agents & platform
│       ├── blue-react-developer.md        # (Cursor/Claude/OpenCode)
│       └── ...
├── .github/
│   └── copilot-instructions.md            # (GitHub Copilot - combined file)
├── .windsurf/
│   └── rules/
│       └── blue-react-developer.md        # (Windsurf)
├── .opencode/
│   └── agents/
│       └── blue-react-developer.md        # (OpenCode)
├── .claude/
│   └── agents/
│       └── blue-react-developer.md        # (Claude Desktop)
├── AGENTS.md                              # (Codex - combined file)
└── ...
```

**Note:** Only files for your selected platform are created.

## Auto-Sync

When you update the `blue-gardener` package, installed agents are automatically updated to their latest versions, maintaining your platform's format.

## Platform Migration

To switch platforms, remove all agents and add them again after changing your setup:

```bash
# Remove all agents
npx blue-gardener list  # Note installed agents
# Remove them one by one or delete manifest

# Then add agents - you'll be prompted for new platform
npx blue-gardener add
```

## Troubleshooting

If you accidentally delete the manifest file or agents get out of sync:

```bash
npx blue-gardener repair
```

This will re-detect and re-track any `blue-*` agent files in your project.

## License

MIT
