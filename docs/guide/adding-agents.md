# Adding Agents

Learn how to find and add agents to your project.

## Discovery Methods

### Method 1: Category Browse (Recommended)

Browse agents by category with the interactive menu:

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

Select a category, then select specific agents.

### Method 2: Search

Search for agents by name, description, category, or tags:

::: code-group

```bash [npm]
npx blue-gardener search react
npx blue-gardener search testing
npx blue-gardener search security
```

```bash [pnpm]
pnpm blue-gardener search react
pnpm blue-gardener search testing
pnpm blue-gardener search security
```

```bash [yarn]
yarn blue-gardener search react
yarn blue-gardener search testing
yarn blue-gardener search security
```

:::

### Method 3: Direct Installation

Install specific agents by name:

::: code-group

```bash [npm]
npx blue-gardener add blue-react-developer blue-frontend-code-reviewer
```

```bash [pnpm]
pnpm blue-gardener add blue-react-developer blue-frontend-code-reviewer
```

```bash [yarn]
yarn blue-gardener add blue-react-developer blue-frontend-code-reviewer
```

:::

## By Project Type

### Frontend React Project

::: code-group

```bash [npm]
npx blue-gardener add \
  blue-react-developer \
  blue-state-management-expert \
  blue-ui-styling-specialist \
  blue-frontend-code-reviewer \
  blue-accessibility-specialist
```

```bash [pnpm]
pnpm blue-gardener add \
  blue-react-developer \
  blue-state-management-expert \
  blue-ui-styling-specialist \
  blue-frontend-code-reviewer \
  blue-accessibility-specialist
```

```bash [yarn]
yarn blue-gardener add \
  blue-react-developer \
  blue-state-management-expert \
  blue-ui-styling-specialist \
  blue-frontend-code-reviewer \
  blue-accessibility-specialist
```

:::

### Backend Node.js Project

::: code-group

```bash [npm]
npx blue-gardener add \
  blue-node-backend-implementation-specialist \
  blue-database-architecture-specialist \
  blue-node-backend-code-reviewer \
  blue-security-specialist
```

```bash [pnpm]
pnpm blue-gardener add \
  blue-node-backend-implementation-specialist \
  blue-database-architecture-specialist \
  blue-node-backend-code-reviewer \
  blue-security-specialist
```

```bash [yarn]
yarn blue-gardener add \
  blue-node-backend-implementation-specialist \
  blue-database-architecture-specialist \
  blue-node-backend-code-reviewer \
  blue-security-specialist
```

:::

### Full-Stack Project

::: code-group

```bash [npm]
npx blue-gardener add \
  blue-feature-specification-analyst \
  blue-architecture-designer \
  blue-react-developer \
  blue-node-backend-implementation-specialist \
  blue-api-integration-expert \
  blue-implementation-review-coordinator
```

```bash [pnpm]
pnpm blue-gardener add \
  blue-feature-specification-analyst \
  blue-architecture-designer \
  blue-react-developer \
  blue-node-backend-implementation-specialist \
  blue-api-integration-expert \
  blue-implementation-review-coordinator
```

```bash [yarn]
yarn blue-gardener add \
  blue-feature-specification-analyst \
  blue-architecture-designer \
  blue-react-developer \
  blue-node-backend-implementation-specialist \
  blue-api-integration-expert \
  blue-implementation-review-coordinator
```

:::

## Essential Agents

Start with these core agents for any project:

### Orchestrators (Workflow Management)

- `blue-feature-specification-analyst` - Plan features
- `blue-architecture-designer` - Design systems
- `blue-implementation-review-coordinator` - Quality assurance

### Quality Essentials

- `blue-frontend-code-reviewer` or `blue-node-backend-code-reviewer` - Code review
- `blue-security-specialist` - Security audit
- `blue-unit-testing-specialist` - Test writing

## Agent Categories

### Orchestrators (5 agents)

High-level planning and coordination:

- Feature specification
- Architecture design
- Refactoring strategy
- Quality gates
- Implementation review

[Browse orchestrators →](/agents/orchestrators)

### Development (9 agents)

Implementation specialists:

- React, Go, Node.js development
- State management
- UI styling
- API integration
- Animations, Storybook

[Browse development agents →](/agents/development)

### Quality (9 agents)

Code quality and testing:

- Code review (frontend, backend)
- Testing (unit, E2E)
- Accessibility
- Performance
- Security
- SEO

[Browse quality agents →](/agents/quality)

### Infrastructure (9 agents)

DevOps and tooling:

- GitHub Actions
- Docker
- Databases
- Monorepo
- CLI tools
- Cron jobs

[Browse infrastructure agents →](/agents/infrastructure)

### Blockchain (11 agents)

Smart contract development:

- Ethereum (Solidity)
- Solana (Rust)
- DeFi protocols
- Gas optimization
- Security audits
- Tokenomics

[Browse blockchain agents →](/agents/blockchain)

### Configuration (1 agent)

Platform setup:

- Multi-platform AI configuration

[Browse configuration agents →](/agents/configuration)

## Verification

After installing, verify agents are installed:

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

## Next Steps

**[Managing Agents →](/guide/managing-agents)**  
Remove, search, sync, and repair agents

**[Orchestration →](/guide/orchestration)**  
Learn how agents work together

**[Agent Catalog →](/agents/)**  
Browse all available agents

## Extending Blue Gardener (project-specific agents, skills, rules)

Blue Gardener’s agents are intentionally generic. Most teams will add project-specific instructions on top.

### Add your own specialists

- Create additional agents in your platform’s native location (e.g. `.cursor/agents/` for Cursor).
- Keep their scope narrow (one domain, one job) so the orchestration manager can route tasks reliably.

### Stay compatible with orchestration

If you want your custom agents to plug into manager → workers workflows, have them follow the same **handoff contract**:

- End responses with a `## Handoff` section that includes:
  - **Inputs**
  - **Assumptions**
  - **Artifacts** (files changed, commands to run, checklists)
  - **Done criteria**
  - **Next workers** (who should run next and why)

This makes it easy for an orchestration manager (or your own commands/workflows) to chain specialists safely.

### Add project rules (and optional platform workflows)

- Use rules for short, persistent conventions (style/architecture constraints).
- If your platform supports it, you may add project-specific workflows/commands in your app repo (e.g., migrations, release checks). These should be **project-owned**, not shipped by Blue Gardener.
- Keep examples in prompts **generic and template-like** to avoid anchoring to a single stack unless the agent is explicitly stack-specific.
