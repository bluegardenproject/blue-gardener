# Orchestration Guide

How Blue Gardener agents work together to deliver high-quality implementations.

## Overview

Blue Gardener agents are designed to collaborate through **orchestration patterns**. Orchestrator agents coordinate specialists, manage workflows, and ensure quality standards. This guide explains how to effectively use these patterns in your projects.

## Agent Types

### Orchestrators

High-level coordinators that understand the full picture and delegate to specialists.

| Agent                                    | Purpose                                              | When to Use                                          |
| ---------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `blue-feature-specification-analyst`     | Requirements clarification & implementation planning | Starting new features with unclear requirements      |
| `blue-architecture-designer`             | Technical strategy & component design                | Making architectural decisions                       |
| `blue-refactoring-strategy-planner`      | Large refactoring & migration planning               | Major refactors or library migrations                |
| `blue-app-quality-gate-keeper`           | Comprehensive quality audits                         | Pre-release checks, quality verification             |
| `blue-implementation-review-coordinator` | Post-implementation quality cycles                   | After feature completion, ensuring quality standards |

### Specialists

Domain experts focused on specific implementation areas (development, quality, infrastructure, blockchain).

See [Agent Catalog](./agents/CATALOG.md) for the complete list of 38 specialist agents.

## Core Orchestration Patterns

### Pattern 1: Feature Development Flow

**Use when:** Building new features from requirements to release

```
User Request: "Build a user authentication feature"

1. @blue-feature-specification-analyst
   Purpose: Clarify requirements and create implementation plan
   Output: Feature specification with acceptance criteria

2. @blue-architecture-designer
   Purpose: Design technical approach and component structure
   Output: Technical architecture with specialist recommendations

3. Implementation Specialists (parallel execution)
   - @blue-react-developer → Build auth components
   - @blue-state-management-expert → Set up auth state
   - @blue-api-integration-expert → Integrate auth API
   - @blue-ui-styling-specialist → Style auth UI

4. @blue-implementation-review-coordinator
   Purpose: Ensure quality standards through review-fix cycles
   Delegates to: @blue-app-quality-gate-keeper
   Output: Final sign-off with quality report
```

**Key characteristics:**

- Linear flow with clear hand-offs
- Parallel implementation phase for efficiency
- Quality verification at the end
- Each orchestrator adds specific value

### Pattern 2: Quality Assurance Flow

**Use when:** Verifying code quality before releases or after implementation

```
User Request: "Review the checkout feature before we ship"

1. @blue-implementation-review-coordinator
   Purpose: Coordinate comprehensive review with feedback loops

   ├─> Delegates to: @blue-app-quality-gate-keeper
   │     Purpose: Run comprehensive quality audits
   │
   │     ├─> @blue-frontend-code-reviewer (code quality)
   │     ├─> @blue-security-specialist (payment security)
   │     ├─> @blue-performance-specialist (checkout performance)
   │     └─> @blue-accessibility-specialist (form accessibility)
   │
   ├─> Analyzes findings & routes feedback
   │
   ├─> Delegates fixes to implementation specialists
   │     - @blue-react-developer → Fix component issues
   │     - @blue-security-specialist → Fix security issues
   │
   └─> Re-audits and iterates until quality standards met
```

**Key characteristics:**

- Iterative feedback loops
- Clear issue routing to specialists
- Multiple audit dimensions
- Final sign-off only when standards met

### Pattern 3: Refactoring Flow

**Use when:** Planning and executing large-scale code changes

```
User Request: "Migrate from Redux to Zustand"

1. @blue-refactoring-strategy-planner
   Purpose: Analyze current state and create phased migration plan
   Output: Migration strategy with risk assessment

2. Phase 1: Setup
   - @blue-state-management-expert → Set up Zustand store
   - @blue-unit-testing-specialist → Add behavior tests

3. @blue-implementation-review-coordinator
   Purpose: Verify phase 1 before proceeding

4. Phase 2: Migration
   - @blue-react-developer → Migrate components incrementally
   - @blue-state-management-expert → Handle coexistence

5. @blue-implementation-review-coordinator
   Purpose: Verify phase 2 completion

6. Phase 3: Cleanup
   - @blue-react-developer → Remove Redux code

7. @blue-implementation-review-coordinator
   Purpose: Final quality verification
```

**Key characteristics:**

- Phased approach with verification gates
- Risk mitigation through incremental changes
- Quality checks between phases
- Rollback points at each phase

### Pattern 4: Backend Development Flow

**Use when:** Building backend services and APIs

```
User Request: "Build a REST API for product management"

1. @blue-architecture-designer
   Purpose: Design system architecture and select database
   Output: System design with database recommendations

2. @blue-database-architecture-specialist
   Purpose: Design schema and data model
   Output: Database schema and access patterns

3. Implementation (parallel)
   - @blue-node-backend-implementation-specialist → Implement API endpoints
   - @blue-relational-database-specialist → Set up PostgreSQL schema

4. @blue-implementation-review-coordinator
   Delegates to quality specialists:
   - @blue-node-backend-code-reviewer → Code quality
   - @blue-security-specialist → API security
   - @blue-unit-testing-specialist → Test coverage
```

**Key characteristics:**

- Architecture-first approach
- Database design before implementation
- Parallel implementation when possible
- Comprehensive backend quality checks

### Pattern 5: Blockchain Project Flow

**Use when:** Building crypto/Web3 applications

```
User Request: "Build a token staking dApp"

1. @blue-blockchain-product-strategist
   Purpose: Requirements, chain selection, tokenomics
   Output: Product strategy and technical constraints

2. @blue-blockchain-architecture-designer
   Purpose: Smart contract architecture and protocol design
   Output: Contract structure and interaction design

3. Implementation (parallel)
   - @blue-blockchain-ethereum-developer → Solidity contracts
   - @blue-blockchain-frontend-integrator → Web3 React dApp
   - @blue-blockchain-backend-integrator → Event indexing

4. @blue-implementation-review-coordinator
   Delegates to blockchain specialists:
   - @blue-blockchain-security-auditor → Contract security
   - @blue-blockchain-code-reviewer → Code quality
   - @blue-blockchain-gas-optimizer → Gas optimization
   - Standard quality specialists for frontend/backend
```

**Key characteristics:**

- Product strategy defines technical approach
- Security-critical review phase
- Specialized blockchain audits
- Gas optimization as explicit step

## Advanced Orchestration Concepts

### Delegation Hierarchy

Orchestrators delegate to specialists, who focus on execution:

```
Orchestrator Layer (Strategic)
├─ blue-feature-specification-analyst
├─ blue-architecture-designer
├─ blue-refactoring-strategy-planner
├─ blue-app-quality-gate-keeper
└─ blue-implementation-review-coordinator

         ↓ delegates to ↓

Specialist Layer (Tactical)
├─ Development specialists (9 agents)
├─ Quality specialists (9 agents)
├─ Infrastructure specialists (9 agents)
├─ Blockchain specialists (11 agents)
└─ Configuration specialists (1 agent)
```

**Rule:** Orchestrators coordinate; specialists execute.

### Parallel vs Sequential Execution

**Parallel execution** (when tasks are independent):

```
@blue-react-developer     → Build components
@blue-ui-styling-specialist → Style components  } Execute simultaneously
@blue-state-management-expert → Set up state
```

**Sequential execution** (when tasks depend on each other):

```
1. @blue-architecture-designer → Define structure
2. @blue-react-developer → Implement based on architecture
3. @blue-implementation-review-coordinator → Review implementation
```

### Feedback Loops

The review coordinator enables iterative improvement:

```
Implementation → Quality Gate → Findings
       ↑                            ↓
   Fix Issues ←──────────── Route to Specialists

Repeat until quality standards met
```

**Maximum iterations:** 3-5 depending on feature complexity

### Escalation Points

Orchestrators escalate to users when:

- Multiple valid approaches exist (architectural decisions)
- Requirements are ambiguous (specification gaps)
- Quality issues persist after multiple iterations
- Trade-offs require user input

## Choosing the Right Orchestrator

### Decision Tree

```
Do you have clear requirements?
├─ No → @blue-feature-specification-analyst
└─ Yes
    └─ Is this a new feature?
        ├─ Yes
        │   └─ Do you need architectural design?
        │       ├─ Yes → @blue-architecture-designer
        │       └─ No → Go to implementation specialists directly
        └─ No
            └─ Is this a refactoring/migration?
                ├─ Yes → @blue-refactoring-strategy-planner
                └─ No
                    └─ Is this a quality check?
                        ├─ Pre-release audit → @blue-app-quality-gate-keeper
                        └─ Post-implementation → @blue-implementation-review-coordinator
```

### Orchestrator Comparison

| Orchestrator                      | Focus                   | Output                 | Best For             |
| --------------------------------- | ----------------------- | ---------------------- | -------------------- |
| Feature Specification Analyst     | Requirements → Plan     | Implementation plan    | Unclear requirements |
| Architecture Designer             | Plan → Design           | Technical architecture | Complex features     |
| Refactoring Strategy Planner      | Current → Target        | Migration strategy     | Large refactors      |
| Quality Gate Keeper               | Audit → Report          | Quality findings       | Pre-release checks   |
| Implementation Review Coordinator | Review → Fix → Sign-off | Quality approval       | Post-implementation  |

## Scaling with Complexity

| Task Complexity | Orchestrators Used | Specialists Involved | Example                                                             |
| --------------- | ------------------ | -------------------- | ------------------------------------------------------------------- |
| **Trivial**     | 0                  | 1-2                  | Bug fix: developer + reviewer                                       |
| **Simple**      | 0-1                | 2-3                  | Small feature: architect + developer + reviewer                     |
| **Standard**    | 1-2                | 3-5                  | New feature: analyst + architect + developers + review coordinator  |
| **Complex**     | 2-3                | 5-8                  | Major feature: add security, testing, performance specialists       |
| **Enterprise**  | 3-4                | 8+                   | Full release: all orchestrators + comprehensive specialist coverage |

## Best Practices

### 1. Start with the Right Orchestrator

Don't skip planning phases for complex work:

- ❌ Jump straight to implementation without architecture
- ✅ Use feature specification analyst → architecture designer → implementation

### 2. Use Quality Review Coordinator Consistently

After every significant implementation:

- ❌ Skip quality review or do ad-hoc checks
- ✅ Invoke implementation review coordinator for systematic verification

### 3. Respect the Feedback Loop

Allow iteration when quality issues are found:

- ❌ Accept "good enough" with known critical issues
- ✅ Iterate through fix cycles until standards met

### 4. Leverage Parallel Execution

When specialists can work independently:

- ❌ Sequential delegation: wait for each to finish
- ✅ Parallel delegation: all start simultaneously

### 5. Escalate Appropriately

Know when to involve the user:

- ❌ Make architectural decisions without user input
- ✅ Present options with trade-offs and get user decision

## Common Workflows

### Workflow 1: "I need to build a feature"

```bash
User: "I need to add real-time notifications to the dashboard"

Step 1: Invoke @blue-feature-specification-analyst
# Clarifies: notification types, delivery mechanism, user preferences

Step 2: Agent invokes @blue-architecture-designer
# Designs: WebSocket connection, notification state, component structure

Step 3: Agent invokes implementation specialists in parallel
# @blue-react-developer, @blue-state-management-expert, @blue-ui-styling-specialist

Step 4: Agent invokes @blue-implementation-review-coordinator
# Reviews, finds issues, routes fixes, iterates, signs off

Result: Feature complete with quality sign-off
```

### Workflow 2: "Review my code before release"

```bash
User: "Please review the payment integration before we ship"

Step 1: Invoke @blue-implementation-review-coordinator
# Determines: security-critical, needs comprehensive audit

Step 2: Coordinator delegates to @blue-app-quality-gate-keeper
# Gate keeper coordinates: code, security, performance, accessibility audits

Step 3: Coordinator receives findings
# 2 critical security issues, 3 high code quality issues

Step 4: Coordinator routes fixes
# Security → @blue-security-specialist
# Code quality → @blue-react-developer

Step 5: Coordinator re-audits after fixes
# Verifies issues resolved, no new issues

Step 6: Final sign-off
# Quality report shows all standards met

Result: Release approval with documented quality verification
```

### Workflow 3: "Help me refactor this mess"

```bash
User: "We need to migrate from class components to hooks"

Step 1: Invoke @blue-refactoring-strategy-planner
# Analyzes: 47 class components, identifies risks, creates phases

Step 2: Phase 1 - Setup and Testing
# @blue-unit-testing-specialist adds behavioral tests

Step 3: Quality check Phase 1
# @blue-implementation-review-coordinator verifies tests

Step 4: Phase 2 - Migration (leaf components first)
# @blue-react-developer migrates incrementally

Step 5: Quality check Phase 2
# @blue-implementation-review-coordinator verifies no regressions

Step 6: Phase 3 - Cleanup
# @blue-react-developer removes old code

Step 7: Final quality check
# @blue-implementation-review-coordinator final sign-off

Result: Safe migration with verification at each phase
```

## Integration with Platforms

Blue Gardener works across multiple AI coding platforms. The orchestration patterns remain the same, but invocation syntax varies:

### Cursor

```
@blue-feature-specification-analyst Please analyze this feature request...
```

### Claude Desktop

```
Use the blue-feature-specification-analyst agent to analyze...
```

### GitHub Copilot

```
# Agents are in context, reference by name in natural language
I need the feature specification analyst to help with...
```

See [README.md](./README.md) for platform-specific installation instructions.

## Troubleshooting

### Issue: Too many agents involved, workflow too complex

**Solution:** Scale back to fewer orchestrators

- For simple tasks, skip orchestrators and use specialists directly
- For medium tasks, use just one orchestrator

### Issue: Quality issues keep recurring across iterations

**Solution:** Escalate to user or revisit architecture

- If same issues after 2-3 iterations → architectural problem
- Involve architecture designer or escalate to user for approach decision

### Issue: Unclear which orchestrator to start with

**Solution:** Default to feature specification analyst

- It will delegate to other orchestrators as needed
- Better to start too high than too low in the orchestration hierarchy

### Issue: Specialists working on conflicting changes

**Solution:** Use architecture designer first

- Establish clear component boundaries
- Define integration contracts between specialists

## Summary

Blue Gardener orchestration enables:

- ✅ **Systematic quality** through consistent review processes
- ✅ **Efficient collaboration** through clear delegation
- ✅ **Iterative improvement** through feedback loops
- ✅ **Appropriate scaling** from simple to enterprise complexity
- ✅ **Clear accountability** with sign-off points

Start with orchestrators for complex work, iterate through quality cycles, and scale your agent usage to match your task complexity.

For the complete agent catalog, see [CATALOG.md](./agents/CATALOG.md).
