export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type must be one of these
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting, no code change
        "refactor", // Code change that neither fixes nor adds
        "perf", // Performance improvement
        "test", // Adding tests
        "chore", // Maintenance
        "ci", // CI/CD changes
        "build", // Build system changes
        "revert", // Revert previous commit
      ],
    ],
    // Scope is optional but encouraged
    "scope-case": [2, "always", "kebab-case"],
    // Subject (description) rules
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    // Header max length
    "header-max-length": [2, "always", 100],
  },
};
