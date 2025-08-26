### Development Guide

Internal guide for maintaining a small, professional Cypress E2E suite. Target site is AutomationExercise.com (learning use only).

### Objectives
- Reliable, readable tests that reflect real user flows
- Predictable CI runs with actionable reports
- Minimal flakiness through network control and good selectors

### Quickstart
- Refer to `README.md` for installation and basic usage commands.

### Structure
- A concise overview is available in `README.md` (Repository Structure). This file focuses on standards and maintenance practices.

### Test Standards
- Selectors: prefer `[data-qa="..."]`; avoid brittle class/text selectors
- Timing: avoid fixed waits; use `cy.intercept()` and state-based assertions
- Reuse: factor repeated flows into `cypress/support/commands.js`
- Readability: single responsibility per test; explicit Arrange/Act/Assert

### Example commands
```javascript
// cypress/support/commands.js
cy.signupUser(userData)
cy.loginUser(userData)
cy.getByDataQa(attr)
```

### Cypress config (excerpt)
```javascript
// cypress.config.js
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
  },
  e2e: {
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
```

### Environments and Data
```bash
# .env.local
CYPRESS_BASE_URL=https://automationexercise.com
CYPRESS_API_BASE_URL=https://api.automationexercise.com
```
- Fixtures: store stable test data in `cypress/fixtures/`. Prefer data factories for generated cases.

### CI/CD
- Triggers: push to main, pull requests
- Steps: install + cache; verify Cypress; run suites; upload reports/screenshots
- Artifacts: `cypress/reports/html/index.html`, `cypress/screenshots/`

### Quality Gates
- Lint: `npm run lint` required to pass locally and in CI
- Flake watch: address intermittent tests before merging
- Reviews: keep diffs small; include rationale in PR description

### Git workflow (solo)
```bash
git add .
git commit -m "feat: add new test"
git push origin main
```

Guidelines: descriptive commits, small increments, lint before push.

### Tooling
- ESLint (JS/MD) + Prettier
- Optional: `eslint-plugin-cypress` for Cypress-specific best practices

—

This repository is a focused learning environment that mirrors professional testing practices without unnecessary complexity.
