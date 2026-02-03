# Agent Catalog

Complete list of available agents in Blue Gardener.

**Total: 24 agents**

| Category       | Count |
| -------------- | ----- |
| Orchestrators  | 4     |
| Development    | 7     |
| Quality        | 7     |
| Infrastructure | 5     |
| Configuration  | 1     |

---

## Orchestrators

High-level planning and coordination agents that understand the full picture and delegate to specialists.

| Agent                                | Description                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `blue-feature-specification-analyst` | Product-technical bridge that clarifies requirements, defines acceptance criteria, and creates implementation plans |
| `blue-architecture-designer`         | Technical strategy specialist for component architecture, data flow, and system integration                         |
| `blue-refactoring-strategy-planner`  | Strategic planner for large refactoring efforts, migrations, and technical debt reduction                           |
| `blue-app-quality-gate-keeper`       | Quality gate orchestrator for security, performance, and code quality audits before releases                        |

## Development Specialists

Domain experts for implementation work.

| Agent                             | Description                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `blue-react-developer`            | React ecosystem specialist for components, hooks, patterns, and React Native        |
| `blue-state-management-expert`    | State management covering Redux, Zustand, XState, Jotai, and Context                |
| `blue-ui-styling-specialist`      | Visual implementation with Tailwind, CSS-in-JS, and responsive design               |
| `blue-api-integration-expert`     | Data layer specialist for REST, GraphQL, tRPC, and data fetching patterns           |
| `blue-third-party-api-strategist` | Plans third-party API integrations: auth, rate limits, data mapping, error handling |
| `blue-animation-specialist`       | Web animations and micro-interactions with CSS, Framer Motion, and GSAP             |
| `blue-storybook-specialist`       | Storybook configuration, efficient story writing, and component documentation       |

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
| `blue-seo-specialist`           | SEO optimization for meta tags, structured data, and search engine visibility   |

## Infrastructure

CI/CD, tooling, and configuration specialists.

| Agent                                     | Description                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| `blue-github-actions-specialist`          | GitHub Actions and workflow specialist for CI/CD pipelines                    |
| `blue-typescript-cli-developer`           | TypeScript CLI tool development with complexity-aware architecture            |
| `blue-docker-specialist`                  | Docker and containerization for development and production                    |
| `blue-monorepo-specialist`                | Monorepo tooling with Nx, Turborepo, and pnpm workspaces                      |
| `blue-cron-job-implementation-specialist` | Cron job expert for implementing, maintaining, and monitoring scheduled tasks |

## Configuration

IDE and tool configuration experts.

| Agent                                  | Description                                               |
| -------------------------------------- | --------------------------------------------------------- |
| `blue-cursor-configuration-specialist` | Cursor IDE configuration for rules, skills, and subagents |

---

## Orchestration Patterns

Blue Gardener agents are designed to work together. Here are the key orchestration patterns:

### Feature Development Flow

For implementing new features:

```
1. @blue-feature-specification-analyst
   → Clarifies requirements
   → Creates implementation plan

2. @blue-architecture-designer
   → Designs technical approach
   → Recommends specialists

3. Implementation specialists (parallel):
   → @blue-react-developer
   → @blue-state-management-expert
   → @blue-ui-styling-specialist

4. Quality gates:
   → @blue-code-reviewer
   → @blue-security-specialist (if sensitive)
```

### Refactoring Flow

For large migrations and refactoring:

```
1. @blue-refactoring-strategy-planner
   → Analyzes current state
   → Creates phased migration plan
   → Identifies risks

2. Implementation specialists:
   → Relevant specialists per phase

3. Verification:
   → @blue-unit-testing-specialist
   → @blue-e2e-testing-specialist
```

### Third-Party API Integration Flow

For integrating external APIs (Stripe, Auth0, etc.):

```
1. @blue-architecture-designer
   → Identifies need for third-party integration
   → High-level technical strategy

2. @blue-third-party-api-strategist
   → Reviews API documentation
   → Plans auth, rate limits, data mapping
   → Defines error handling strategy
   → Creates implementation tasks

3. @blue-api-integration-expert
   → Implements the technical details
   → React Query/RTK Query hooks
   → Error handling code

4. @blue-security-specialist (if auth/payments)
   → Reviews security aspects
```

### Quality Gate Flow

For pre-release audits:

```
1. @blue-app-quality-gate-keeper
   → Determines relevant audits
   → Coordinates specialists

2. Audits (based on context):
   → @blue-code-reviewer (always)
   → @blue-security-specialist (auth, payments)
   → @blue-performance-specialist (user-facing)
   → @blue-accessibility-specialist (UI)
   → @blue-seo-specialist (public pages)

3. Consolidated report with pass/fail decision
```

### Scaling with Complexity

| Task Complexity    | Typical Agents Involved                               |
| ------------------ | ----------------------------------------------------- |
| Simple bug fix     | 1-2 (react-developer + reviewer)                      |
| Standard feature   | 3-5 (planner + architect + implementation + reviewer) |
| Complex feature    | 6-8 (add security, testing specialists)               |
| Full release audit | 5-7 (quality-gate-keeper + all quality specialists)   |
| Major refactoring  | 4-6 (strategy-planner + implementation + testing)     |
