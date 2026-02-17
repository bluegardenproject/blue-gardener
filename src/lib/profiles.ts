export interface AgentProfile {
  id: string;
  name: string;
  description: string;
  agentNames: string[];
}

/**
 * Install profiles/presets help teams avoid installing 44 agents at once.
 * Profiles are intentionally opinionated defaults. Teams can add/remove agents as needed.
 */
export const AGENT_PROFILES: AgentProfile[] = [
  {
    id: "core",
    name: "Core (full-stack default)",
    description:
      "Broad default for most repos: orchestrators + common frontend/backend implementation specialists + reviews + tests.",
    agentNames: [
      // Orchestrators
      "blue-feature-specification-analyst",
      "blue-architecture-designer",
      "blue-refactoring-strategy-planner",
      "blue-app-quality-gate-keeper",
      "blue-implementation-review-coordinator",
      // Frontend implementation
      "blue-react-developer",
      "blue-state-management-expert",
      "blue-ui-styling-specialist",
      "blue-api-integration-expert",
      // Backend implementation
      "blue-node-backend-implementation-specialist",
      "blue-database-architecture-specialist",
      "blue-relational-database-specialist",
      // Quality + tests
      "blue-frontend-code-reviewer",
      "blue-node-backend-code-reviewer",
      "blue-accessibility-specialist",
      "blue-security-specialist",
      "blue-performance-specialist",
      "blue-unit-testing-specialist",
      "blue-e2e-testing-specialist",
    ],
  },
  {
    id: "orchestration",
    name: "Orchestration (planning + quality)",
    description:
      "Lightweight baseline: orchestrators + essential quality specialists. Add implementation profiles for your stack.",
    agentNames: [
      // Orchestrators
      "blue-feature-specification-analyst",
      "blue-architecture-designer",
      "blue-refactoring-strategy-planner",
      "blue-app-quality-gate-keeper",
      "blue-implementation-review-coordinator",
      // Quality essentials
      "blue-security-specialist",
      "blue-performance-specialist",
      "blue-unit-testing-specialist",
    ],
  },
  {
    id: "frontend-react",
    name: "Frontend (React)",
    description:
      "React implementation + state/UI/data specialists with quality coverage.",
    agentNames: [
      // Orchestrators
      "blue-feature-specification-analyst",
      "blue-architecture-designer",
      "blue-refactoring-strategy-planner",
      "blue-app-quality-gate-keeper",
      "blue-implementation-review-coordinator",
      // Dev
      "blue-react-developer",
      "blue-state-management-expert",
      "blue-ui-styling-specialist",
      "blue-api-integration-expert",
      // Quality
      "blue-frontend-code-reviewer",
      "blue-accessibility-specialist",
      "blue-performance-specialist",
      "blue-security-specialist",
      "blue-unit-testing-specialist",
      "blue-e2e-testing-specialist",
    ],
  },
  {
    id: "backend-node",
    name: "Backend (Node.js)",
    description:
      "Node backend implementation + database architecture with quality coverage.",
    agentNames: [
      // Orchestrators
      "blue-architecture-designer",
      "blue-refactoring-strategy-planner",
      "blue-app-quality-gate-keeper",
      "blue-implementation-review-coordinator",
      // Dev/Infra
      "blue-node-backend-implementation-specialist",
      "blue-database-architecture-specialist",
      "blue-relational-database-specialist",
      // Quality
      "blue-node-backend-code-reviewer",
      "blue-security-specialist",
      "blue-unit-testing-specialist",
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure / DevOps",
    description: "CI/CD, containers, monorepo tooling, and ops fundamentals.",
    agentNames: [
      "blue-github-actions-specialist",
      "blue-docker-specialist",
      "blue-monorepo-specialist",
      "blue-cron-job-implementation-specialist",
      "blue-database-architecture-specialist",
    ],
  },
  {
    id: "blockchain",
    name: "Blockchain / Web3",
    description:
      "Smart contract + dApp specialists (add chain-specific agents as needed).",
    agentNames: [
      // Orchestrators
      "blue-architecture-designer",
      "blue-refactoring-strategy-planner",
      "blue-app-quality-gate-keeper",
      "blue-implementation-review-coordinator",
      // Blockchain (broad)
      "blue-blockchain-product-strategist",
      "blue-blockchain-architecture-designer",
      "blue-blockchain-code-reviewer",
      "blue-blockchain-security-auditor",
      "blue-blockchain-frontend-integrator",
      "blue-blockchain-backend-integrator",
      // Cross-cutting
      "blue-security-specialist",
    ],
  },
];

export function getProfiles(): AgentProfile[] {
  return AGENT_PROFILES;
}

export function getProfile(profileId: string): AgentProfile | undefined {
  return AGENT_PROFILES.find((p) => p.id === profileId);
}
