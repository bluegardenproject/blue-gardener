# Agent Catalog

Complete catalog of all 44 Blue Gardener agents organized by category.

## Overview

| Category                          | Count | Description                         |
| --------------------------------- | ----- | ----------------------------------- |
| [Orchestrators](#orchestrators)   | 5     | Planning and coordination agents    |
| [Development](#development)       | 9     | Implementation specialists          |
| [Quality](#quality)               | 9     | Code quality and testing experts    |
| [Infrastructure](#infrastructure) | 9     | DevOps and tooling specialists      |
| [Configuration](#configuration)   | 1     | Platform setup expert               |
| [Blockchain](#blockchain)         | 11    | Smart contract and Web3 specialists |

**Total: 44 agents**

## Quick Navigation

- [Orchestrators →](/agents/orchestrators) - High-level coordinators
- [Development →](/agents/development) - Build features
- [Quality →](/agents/quality) - Ensure code quality
- [Infrastructure →](/agents/infrastructure) - DevOps & databases
- [Configuration →](/agents/configuration) - Platform setup
- [Blockchain →](/agents/blockchain) - Smart contracts & DeFi

## Installing Agents

Browse and install agents by category:

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

Or install specific agents:

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

## Orchestrators

High-level planning and coordination agents that understand the full picture and delegate to specialists.

| Agent                                    | Description                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `blue-feature-specification-analyst`     | Product-technical bridge that clarifies requirements, defines acceptance criteria, and creates implementation plans |
| `blue-architecture-designer`             | Technical strategy specialist for component architecture, data flow, and system integration                         |
| `blue-refactoring-strategy-planner`      | Strategic planner for large refactoring efforts, migrations, and technical debt reduction                           |
| `blue-app-quality-gate-keeper`           | Quality gate orchestrator for security, performance, and code quality audits before releases                        |
| `blue-implementation-review-coordinator` | Post-implementation coordinator that ensures features meet quality standards through iterative review-fix cycles    |

[View orchestrators details →](/agents/orchestrators)

## Development

Domain experts for implementation work across frontend, backend, and integrations.

| Agent                                         | Description                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------- |
| `blue-react-developer`                        | React ecosystem specialist for components, hooks, patterns, and React Native        |
| `blue-state-management-expert`                | State management covering Redux, Zustand, XState, Jotai, and Context                |
| `blue-ui-styling-specialist`                  | Visual implementation with Tailwind, CSS-in-JS, and responsive design               |
| `blue-api-integration-expert`                 | Data layer specialist for REST, GraphQL, tRPC, and data fetching patterns           |
| `blue-third-party-api-strategist`             | Plans third-party API integrations: auth, rate limits, data mapping, error handling |
| `blue-animation-specialist`                   | Web animations and micro-interactions with CSS, Framer Motion, and GSAP             |
| `blue-storybook-specialist`                   | Storybook configuration, efficient story writing, and component documentation       |
| `blue-node-backend-implementation-specialist` | Node.js/TypeScript backend with Express, Fastify, NestJS, and Hono                  |
| `blue-go-backend-implementation-specialist`   | Go backend with standard library, Gin, Echo, and Fiber frameworks                   |

[View development agents details →](/agents/development)

## Quality

Code quality, testing, and optimization experts ensuring high standards.

| Agent                             | Description                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `blue-frontend-code-reviewer`     | Frontend code quality for JavaScript/TypeScript, React, Vue, and web apps       |
| `blue-node-backend-code-reviewer` | Node.js/TypeScript backend code quality and best practices                      |
| `blue-go-backend-code-reviewer`   | Go backend code quality, idioms, and concurrency patterns                       |
| `blue-accessibility-specialist`   | Accessibility (a11y) expert for WCAG compliance and screen reader support       |
| `blue-unit-testing-specialist`    | Unit testing with Jest, Vitest, and React Testing Library                       |
| `blue-e2e-testing-specialist`     | End-to-end testing with Playwright and Cypress                                  |
| `blue-performance-specialist`     | Performance optimization for bundle size, rendering, and caching                |
| `blue-security-specialist`        | Frontend security for auth flows, XSS/CSRF prevention, and secure data handling |
| `blue-seo-specialist`             | SEO optimization for meta tags, structured data, and search engine visibility   |

[View quality agents details →](/agents/quality)

## Infrastructure

CI/CD, tooling, databases, and configuration specialists.

| Agent                                     | Description                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| `blue-github-actions-specialist`          | GitHub Actions and workflow specialist for CI/CD pipelines                    |
| `blue-typescript-cli-developer`           | TypeScript CLI tool development with complexity-aware architecture            |
| `blue-docker-specialist`                  | Docker and containerization for development and production                    |
| `blue-monorepo-specialist`                | Monorepo tooling with Nx, Turborepo, and pnpm workspaces                      |
| `blue-cron-job-implementation-specialist` | Cron job expert for implementing, maintaining, and monitoring scheduled tasks |
| `blue-database-architecture-specialist`   | Database-agnostic design, schema planning, and database type selection        |
| `blue-relational-database-specialist`     | PostgreSQL and MySQL implementation, queries, and optimization                |
| `blue-document-database-specialist`       | MongoDB document modeling, aggregation pipelines, and operations              |
| `blue-keyvalue-database-specialist`       | Redis caching, sessions, pub/sub, and key-value store patterns                |

[View infrastructure agents details →](/agents/infrastructure)

## Configuration

AI platform and tool configuration experts.

| Agent                                       | Description                                                                                                                                               |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blue-ai-platform-configuration-specialist` | Multi-platform AI configuration for agents, rules, and conventions across 6 platforms (Cursor, Claude Desktop, Codex, GitHub Copilot, Windsurf, OpenCode) |

[View configuration agent details →](/agents/configuration)

## Blockchain

Smart contract development, DeFi, and Web3 specialists.

| Agent                                   | Description                                                                |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `blue-blockchain-product-strategist`    | Blockchain product planning, chain selection, and tokenomics strategy      |
| `blue-blockchain-architecture-designer` | Smart contract architecture, protocol design, and system integration       |
| `blue-blockchain-ethereum-developer`    | Solidity/EVM development with Foundry/Hardhat, testing, and gas efficiency |
| `blue-blockchain-solana-developer`      | Rust/Anchor development for Solana programs and account model              |
| `blue-blockchain-frontend-integrator`   | Wallet connections, Web3 React hooks, and transaction UX                   |
| `blue-blockchain-backend-integrator`    | Event indexing, The Graph subgraphs, and blockchain API services           |
| `blue-blockchain-security-auditor`      | Smart contract security audits, vulnerability detection, and remediation   |
| `blue-blockchain-code-reviewer`         | Smart contract code quality, best practices, and documentation             |
| `blue-blockchain-gas-optimizer`         | EVM gas optimization, storage packing, and efficient patterns              |
| `blue-blockchain-tokenomics-designer`   | Token economics, distribution, incentives, and sustainable models          |
| `blue-blockchain-defi-specialist`       | DeFi mechanics: lending, AMMs, yield strategies, and protocol design       |

[View blockchain agents details →](/agents/blockchain)

## Searching Agents

Find agents by keywords:

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

## Next Steps

**[Orchestration Guide →](/guide/orchestration)**  
Learn how agents work together

**[Adding Agents →](/guide/adding-agents)**  
Install agents in your project

**[CLI Reference →](/reference/cli)**  
Complete command documentation
