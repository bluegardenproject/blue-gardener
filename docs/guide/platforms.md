# Platforms

Blue Gardener supports 6 different AI coding platforms. Each platform has its own format for storing agents and instructions.

## Supported Platforms

### Cursor

**Location:** `.cursor/agents/*.md`  
**Format:** Multi-file (one file per agent)  
**Features:** Native agent support, also supports rules and skills

**Example structure:**

```
.cursor/agents/
├── .blue-generated-manifest.json
├── blue-react-developer.md
└── blue-frontend-code-reviewer.md
```

**Invoking agents:** `@blue-react-developer`

### Claude Desktop

**Location:** `.claude/agents/*.md`  
**Format:** Multi-file (one file per agent)  
**Features:** MCP agents

**Example structure:**

```
.claude/agents/
├── .blue-generated-manifest.json
├── blue-react-developer.md
└── blue-frontend-code-reviewer.md
```

**Invoking agents:** `@blue-react-developer`

### OpenCode

**Location:** `.opencode/agents/*.md`  
**Format:** Multi-file (one file per agent)  
**Features:** Custom agents

**Example structure:**

```
.opencode/agents/
├── .blue-generated-manifest.json
├── blue-react-developer.md
└── blue-frontend-code-reviewer.md
```

### Windsurf

**Location:** `.windsurf/rules/*.md`  
**Format:** Multi-file (one file per agent, converted to Cascade rules)  
**Features:** Cascade rules format

**Example structure:**

```
.windsurf/rules/
├── .blue-generated-manifest.json
├── blue-react-developer.md
└── blue-frontend-code-reviewer.md
```

### Codex

**Location:** `AGENTS.md` (root)  
**Format:** Single-file (all agents combined)  
**Features:** All agents in one markdown file

**Example structure:**

```markdown
# AI Agents

## React Developer Agent

You are a React specialist...

---

## Code Reviewer Agent

You are a code reviewer...
```

### GitHub Copilot

**Location:** `.github/copilot-instructions.md`  
**Format:** Single-file (all agents combined)  
**Features:** Custom instructions format

**Example structure:**

```markdown
# Custom Instructions for GitHub Copilot

## React Developer

When developing React components...

---

## Code Reviewer

When reviewing code...
```

## Platform Detection

Blue Gardener auto-detects your platform on first use:

| Check                                    | Platform       |
| ---------------------------------------- | -------------- |
| `.cursor/agents/` exists                 | Cursor         |
| `.claude/agents/` exists                 | Claude Desktop |
| `.windsurf/` exists                      | Windsurf       |
| `.opencode/agents/` exists               | OpenCode       |
| `.github/copilot-instructions.md` exists | GitHub Copilot |
| `AGENTS.md` exists                       | Codex          |

If no platform is detected, you'll be prompted to select one.

## Multi-File vs Single-File

### Multi-File Platforms

**Cursor, Claude Desktop, OpenCode, Windsurf**

Each agent is a separate markdown file:

**Advantages:**

- Easy to browse individual agents
- Can version control agents separately
- Clear organization

**Operations:**

- **Add:** Creates new `.md` file
- **Remove:** Deletes the `.md` file
- **Sync:** Updates each file independently

### Single-File Platforms

**Codex, GitHub Copilot**

All agents combined in one file with sections:

**Advantages:**

- Simple project structure (one file)
- Easy to see all instructions at once

**Operations:**

- **Add:** Appends new section to file
- **Remove:** Rebuilds file without that section
- **Sync:** Regenerates entire file

## Platform-Specific Behavior

### Adding Agents

::: code-group

```bash [Cursor/Claude/OpenCode/Windsurf]
# Creates individual files
npx blue-gardener add blue-react-developer
# Result: .cursor/agents/blue-react-developer.md
```

```bash [Codex]
# Appends to AGENTS.md
npx blue-gardener add blue-react-developer
# Result: Section added to AGENTS.md
```

```bash [GitHub Copilot]
# Appends to copilot-instructions.md
npx blue-gardener add blue-react-developer
# Result: Section added to .github/copilot-instructions.md
```

:::

### Removing Agents

::: code-group

```bash [Cursor/Claude/OpenCode/Windsurf]
# Deletes the file
npx blue-gardener remove blue-react-developer
# Result: .cursor/agents/blue-react-developer.md deleted
```

```bash [Codex/GitHub Copilot]
# Rebuilds file without that section
npx blue-gardener remove blue-react-developer
# Result: AGENTS.md regenerated
```

:::

## Manifest Tracking

Blue Gardener creates a `.blue-generated-manifest.json` file to track:

- Which platform you're using
- Which agents are installed
- Agent versions

**Location:**

- Multi-file: Same directory as agents (e.g., `.cursor/agents/.blue-generated-manifest.json`)
- Single-file: Root directory (`.blue-generated-manifest.json`)

## Switching Platforms

To switch from one platform to another:

1. Remove all agents from current platform
2. Delete or rename the manifest file
3. Add agents again (Blue Gardener will detect new platform)

::: code-group

```bash [npm]
# List and note your agents
npx blue-gardener list

# Remove all agents
npx blue-gardener remove <agent-name>

# Delete manifest (optional)
rm .cursor/agents/.blue-generated-manifest.json

# Add agents to new platform
npx blue-gardener add
```

```bash [pnpm]
# List and note your agents
pnpm blue-gardener list

# Remove all agents
pnpm blue-gardener remove <agent-name>

# Delete manifest (optional)
rm .cursor/agents/.blue-generated-manifest.json

# Add agents to new platform
pnpm blue-gardener add
```

```bash [yarn]
# List and note your agents
yarn blue-gardener list

# Remove all agents
yarn blue-gardener remove <agent-name>

# Delete manifest (optional)
rm .cursor/agents/.blue-generated-manifest.json

# Add agents to new platform
yarn blue-gardener add
```

:::

## Next Steps

**[Adding Agents →](/guide/adding-agents)**  
Learn how to find and install agents

**[Agent Catalog →](/agents/)**  
Browse all 44 available agents
