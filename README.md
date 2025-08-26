### AutomationExercice – E2E Test Suite

Focused, production-like E2E test suite built with Cypress for the public demo site AutomationExercise.com (learning purposes only, not affiliated). The repository aims to reflect professional habits: explicit scope, predictable workflows, and clear quality gates.

### Scope
- Functional UI flows: signup, login, shop, checkout, contact, core UI
- Cross-browser via CI (Chrome baseline; others on demand)
- Deterministic tests (network stubbing where valuable, minimal flakiness)

### Installation and Usage
```bash
git clone https://github.com/Kamaiko/AutomationExercice.git
cd AutomationExercice
npm install
npx cypress verify

# Open interactive runner
npm run cypress:open

# Run headless
npm run cypress:run

# Run a focused spec
npx cypress run --spec "cypress/e2e/User/login.cy.js"
```

### Repository Structure
```text
cypress/
├── e2e/          # specs by domain
├── fixtures/     # test data
├── support/      # commands & setup
├── screenshots/  # failure screenshots
└── reports/      # HTML reports
```

### Test Conventions
 - Prefer data attributes for selectors: `[data-qa="..."]`
 - Avoid arbitrary waits; prefer `cy.intercept()` + assertions
 - Extract repeated flows into custom commands

### Custom Commands (examples)
```javascript
// cypress/support/commands.js
cy.signupUser(userData)
cy.loginUser(userData)
cy.getByDataQa(attr)
```

### Cypress Configuration (excerpt)
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
  e2e: { setupNodeEvents(on) { require('cypress-mochawesome-reporter/plugin')(on); } },
});
```

### Environments
```bash
# .env.local
CYPRESS_BASE_URL=https://automationexercise.com
CYPRESS_API_BASE_URL=https://api.automationexercise.com
```

### CI and Quality Gates
- GitHub Actions: install, cache, verify, run tests, publish artifacts
- Artifacts: Mochawesome HTML report, screenshots on failure
- Lint: ESLint for JS/MD; warnings fail locally before push

### Contributing
- Keep PRs small and scoped to one concern
- Ensure `npm run lint` and test run pass locally

### License
ISC. See LICENSE.