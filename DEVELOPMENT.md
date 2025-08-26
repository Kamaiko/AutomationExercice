### Development Guide

Humble, focused guide for practicing modern E2E testing. This project targets AutomationExercise.com for learning purposes only (not affiliated).

### Goals
- End-to-end testing with Cypress
- CI/CD with GitHub Actions
- Clear reporting (Mochawesome)
- Clean structure and pragmatic best practices

### Quickstart
- Prerequisites: Node.js 20+, npm 9+, Git
- Install
```bash
git clone https://github.com/Kamaiko/AutomationExercice.git
cd AutomationExercice
npm install
npx cypress verify
```
- Run tests
```bash
npm run cypress:open   # interactive
npm run cypress:run    # headless
npx cypress run --spec "cypress/e2e/User/login.cy.js"  # focused
```

### Structure
```text
cypress/
├── e2e/          # test specs by domain
├── fixtures/     # test data
├── support/      # commands & setup
│   ├── commands.js
│   └── e2e.js
├── screenshots/  # failure screenshots
└── reports/      # HTML reports
```

### Conventions
- Selectors: prefer data attributes (`[data-qa="..."]`)
- Reuse: move repeated flows into custom commands
- Stability: avoid arbitrary waits; use intercepts and assertions
- Readability: small, focused tests with clear assertions

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

### Env vars
```bash
# .env.local
CYPRESS_BASE_URL=https://automationexercise.com
CYPRESS_API_BASE_URL=https://api.automationexercise.com
```

### CI/CD (GitHub Actions)
- Triggers: push to main, PRs
- Steps: install + cache, verify Cypress, run tests, upload artifacts (reports/screenshots)

### Reporting
- Mochawesome HTML report with embedded screenshots
- Artifacts retained for quick review

### Git workflow (solo)
```bash
git add .
git commit -m "feat: add new test"
git push origin main
```

Guidelines: descriptive commits, small increments, lint before push.

### Quality
- ESLint + sensible rules (Airbnb-inspired), Prettier formatting
- Cypress plugin lint rules to promote good testing practices

—

This repository is designed as a focused learning environment for QA/SDET skills.
