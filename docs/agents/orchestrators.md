# Orchestrators

High-level planning and coordination agents that understand the full picture and delegate to specialists.

## Overview

Orchestrators are meta-agents that coordinate complex workflows by delegating to specialist agents. They understand the big picture and manage the collaboration between multiple agents.

**Total:** 5 agents

## When to Use Orchestrators

- Starting new features
- Making architectural decisions
- Planning large refactors
- Conducting quality reviews
- Coordinating post-implementation feedback

## Agents

### blue-feature-specification-analyst

**Purpose:** Product-technical bridge that clarifies requirements, defines acceptance criteria, and creates implementation plans

**Use when:**

- Starting new features with unclear requirements
- Need to translate user stories into technical tasks
- Creating implementation plans

**Workflow:**

1. Analyzes user requirements
2. Asks clarifying questions
3. Defines acceptance criteria
4. Creates structured specification
5. Recommends specialists for implementation

**Install:**

::: code-group

```bash [npm]
npx blue-gardener add blue-feature-specification-analyst
```

```bash [pnpm]
pnpm blue-gardener add blue-feature-specification-analyst
```

```bash [yarn]
yarn blue-gardener add blue-feature-specification-analyst
```

:::

### blue-architecture-designer

**Purpose:** Technical strategy specialist for component architecture, data flow, and system integration

**Use when:**

- Making architectural decisions
- Choosing technologies
- Planning complex implementations
- Designing system components

**Workflow:**

1. Reviews specifications
2. Analyzes existing codebase
3. Designs architecture
4. Proposes optimal solutions with alternatives
5. Documents technical decisions

**Install:**

::: code-group

```bash [npm]
npx blue-gardener add blue-architecture-designer
```

```bash [pnpm]
pnpm blue-gardener add blue-architecture-designer
```

```bash [yarn]
yarn blue-gardener add blue-architecture-designer
```

:::

### blue-refactoring-strategy-planner

**Purpose:** Strategic planner for large refactoring efforts, migrations, and technical debt reduction

**Use when:**

- Planning major refactors
- Migrating libraries or frameworks
- Reducing technical debt
- Modernizing legacy code

**Workflow:**

1. Analyzes current state
2. Assesses risks
3. Creates phased migration plan
4. Defines verification criteria
5. Recommends rollback strategies

**Install:**

::: code-group

```bash [npm]
npx blue-gardener add blue-refactoring-strategy-planner
```

```bash [pnpm]
pnpm blue-gardener add blue-refactoring-strategy-planner
```

```bash [yarn]
yarn blue-gardener add blue-refactoring-strategy-planner
```

:::

### blue-app-quality-gate-keeper

**Purpose:** Quality gate orchestrator for security, performance, and code quality audits before releases

**Use when:**

- Pre-release quality checks
- Periodic quality audits
- Verifying critical features

**Workflow:**

1. Identifies scope
2. Selects relevant audits
3. Coordinates specialist reviews
4. Consolidates findings
5. Provides pass/fail decision

**Install:**

::: code-group

```bash [npm]
npx blue-gardener add blue-app-quality-gate-keeper
```

```bash [pnpm]
pnpm blue-gardener add blue-app-quality-gate-keeper
```

```bash [yarn]
yarn blue-gardener add blue-app-quality-gate-keeper
```

:::

### blue-implementation-review-coordinator

**Purpose:** Post-implementation coordinator that ensures features meet quality standards through iterative review-fix cycles

**Use when:**

- After feature implementation
- Need comprehensive quality verification
- Want systematic review with feedback loops

**Workflow:**

1. Delegates to quality gate keeper for audits
2. Analyzes findings
3. Routes issues to implementation specialists
4. Manages fix-verify iterations
5. Provides final sign-off

**Install:**

::: code-group

```bash [npm]
npx blue-gardener add blue-implementation-review-coordinator
```

```bash [pnpm]
pnpm blue-gardener add blue-implementation-review-coordinator
```

```bash [yarn]
yarn blue-gardener add blue-implementation-review-coordinator
```

:::

## Orchestration Patterns

Orchestrators work together in proven patterns:

### Feature Development

```
1. Feature Spec Analyst → Clarifies requirements
2. Architecture Designer → Designs approach
3. Implementation Specialists → Build features
4. Review Coordinator → Verifies quality
```

### Quality Assurance

```
1. Review Coordinator → Manages process
2. Quality Gate Keeper → Runs audits
3. Specialists → Fix issues
4. Re-audit → Verify fixes
5. Sign-off → When standards met
```

### Refactoring

```
1. Refactoring Planner → Creates strategy
2. Phase 1 → Setup
3. Review Coordinator → Verify
4. Phase 2 → Migrate
5. Review Coordinator → Verify
6. Phase 3 → Cleanup
7. Final sign-off
```

[Learn more about orchestration patterns →](/guide/orchestration)

## Next Steps

**[Development Agents →](/agents/development)**  
Implementation specialists

**[Quality Agents →](/agents/quality)**  
Code quality and testing

**[Agent Catalog →](/agents/)**  
Browse all agents
