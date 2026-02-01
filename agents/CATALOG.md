# Agent Catalog

Complete list of available agents in Blue Gardener.

## Orchestrators

High-level planning and coordination agents that understand the full picture and delegate to specialists.

| Agent                                | Description                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `blue-feature-specification-analyst` | Product-technical bridge that clarifies requirements, defines acceptance criteria, and creates implementation plans |
| `blue-architecture-designer`         | Technical strategy specialist for component architecture, data flow, and system integration                         |

## Development Specialists

Domain experts for implementation work.

| Agent                          | Description                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `blue-react-developer`         | React ecosystem specialist for components, hooks, patterns, and React Native |
| `blue-state-management-expert` | State management covering Redux, Zustand, XState, Jotai, and Context         |
| `blue-ui-styling-specialist`   | Visual implementation with Tailwind, CSS-in-JS, and responsive design        |
| `blue-api-integration-expert`  | Data layer specialist for REST, GraphQL, tRPC, and data fetching patterns    |

## Quality Specialists

Code quality, testing, and optimization experts.

| Agent                           | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `blue-code-reviewer`            | Code quality reviewer for patterns, performance, and best practices             |
| `blue-accessibility-specialist` | Accessibility (a11y) expert for WCAG compliance and screen reader support       |
| `blue-unit-testing-specialist`  | Unit testing with Jest, Vitest, and React Testing Library                       |
| `blue-e2e-testing-specialist`   | End-to-end testing with Playwright and Cypress                                  |
| `blue-performance-specialist`   | Performance optimization for bundle size, rendering, and caching                |
| `blue-security-specialist`      | Frontend security for auth flows, XSS/CSRF prevention, and secure data handling |

## Infrastructure

CI/CD, tooling, and configuration specialists.

| Agent                            | Description                                                        |
| -------------------------------- | ------------------------------------------------------------------ |
| `blue-github-actions-specialist` | GitHub Actions and workflow specialist for CI/CD pipelines         |
| `blue-typescript-cli-developer`  | TypeScript CLI tool development with complexity-aware architecture |

## Configuration

IDE and tool configuration experts.

| Agent                                  | Description                                               |
| -------------------------------------- | --------------------------------------------------------- |
| `blue-cursor-configuration-specialist` | Cursor IDE configuration for rules, skills, and subagents |

---

## Orchestration Pattern

Blue Gardener agents are designed to work together. For complex features:

1. **Start with the Feature Specification Analyst** - Clarifies requirements and creates an implementation plan
2. **Consult the Architecture Designer** - Designs technical strategy and component structure
3. **Delegate to Specialists** - React, State Management, UI, API experts handle their domains
4. **Quality Review** - Code Reviewer, Testing, and Security specialists validate the work

### Example Workflow

```
User: "Implement checkout flow with x-state in React/Tailwind"

1. @blue-feature-specification-analyst
   → Asks clarifying questions
   → Creates product specification with acceptance criteria

2. @blue-architecture-designer
   → Proposes component structure
   → Recommends x-state for flow control, existing Redux for cart
   → Gets user confirmation

3. Implementation (parallel):
   → @blue-state-management-expert: XState machine design
   → @blue-react-developer: Component implementation
   → @blue-ui-styling-specialist: Tailwind styling

4. Quality:
   → @blue-code-reviewer: Review implementation
   → @blue-security-specialist: Security check (if payment involved)
```

### Scaling with Complexity

The number of agents involved scales with task complexity:

- **Simple bug fix**: 1-2 agents (e.g., react-developer + reviewer)
- **Standard feature**: 3-5 agents (e.g., planner + architect + react + state + reviewer)
- **Complex feature with security**: 6-8 agents (add security, testing specialists)
- **Full feature with E2E tests**: 8+ agents (add e2e-testing, performance, etc.)
