---
layout: home

hero:
  name: Blue Gardener
  text: Multi-Platform AI Agent Management
  tagline: Install, manage, and sync specialized AI coding agents across 6 platforms
  image:
    src: /blue-gardener-logo.png
    alt: Blue Gardener
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Agents
      link: /agents/
    - theme: alt
      text: GitHub
      link: https://github.com/bluegardenproject/blue-gardener

features:
  - icon: 🌐
    title: Multi-Platform Support
    details: Works with Cursor, Claude Desktop, Codex, GitHub Copilot, Windsurf, and OpenCode
  - icon: 🤖
    title: 44 Specialized Agents
    details: Orchestrators, development specialists, quality experts, infrastructure tools, and blockchain specialists
  - icon: 🔄
    title: Auto-Sync
    details: Keep your agents up-to-date automatically when you update the package
  - icon: 📦
    title: Category-Based Organization
    details: Browse agents by category - find exactly what you need quickly
  - icon: 🎯
    title: Orchestration Patterns
    details: Agents work together following proven patterns for feature development, quality assurance, and refactoring
  - icon: 🔍
    title: Smart Search
    details: Search agents by name, description, category, or tags
---

## Quick Start

Install Blue Gardener in your project:

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

Run the interactive menu:

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

## What is Blue Gardener?

Blue Gardener is a CLI tool that manages AI coding agents across multiple platforms. It provides:

- **44 specialized agents** covering orchestration, development, quality, infrastructure, and blockchain
- **Platform adapters** that work with 6 different AI coding platforms
- **Category-based selection** for easy discovery
- **Auto-sync** to keep agents updated
- **Orchestration patterns** for complex workflows

## Supported Platforms

- **Cursor** - Native agent support in `.cursor/agents/`
- **Claude Desktop** - MCP agents in `.claude/agents/`
- **Codex** - OpenAI Codex with `AGENTS.md` file
- **GitHub Copilot** - Custom instructions in `.github/copilot-instructions.md`
- **Windsurf** - Cascade rules in `.windsurf/rules/`
- **OpenCode** - Custom agents in `.opencode/agents/`

[Learn more about platforms →](/guide/platforms)

## Agent Categories

- **Orchestrators (5)** - Planning, coordination, and quality assurance
- **Development (9)** - React, state management, styling, API integration
- **Quality (9)** - Code review, testing, accessibility, performance, security
- **Infrastructure (9)** - GitHub Actions, CLI development, databases, Docker
- **Configuration (1)** - Multi-platform AI setup
- **Blockchain (11)** - Smart contracts, DeFi, Web3 integration

[Browse all agents →](/agents/)

## Example: Feature Development Flow

```mermaid
flowchart TD
    User[User Request] --> Spec[blue-feature-specification-analyst]
    Spec --> Arch[blue-architecture-designer]
    Arch --> Dev[Implementation Specialists]
    Dev --> Review[blue-implementation-review-coordinator]
    Review --> Quality[blue-app-quality-gate-keeper]
    Quality --> Done[Feature Complete]

    style User fill:#e1f5ff
    style Done fill:#d4edda
```

[Learn orchestration patterns →](/guide/orchestration)
