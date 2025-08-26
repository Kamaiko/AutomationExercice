### AutomationExercice – E2E Testing (Student Project)

Minimal, professional setup to practice modern E2E testing with Cypress. Uses AutomationExercise.com for learning only (not affiliated).

### Highlights
- Cypress E2E + Mocha
- GitHub Actions CI with artifacts
- Mochawesome HTML reporting
- Clear test structure and simple scripts

### Quickstart
```bash
git clone https://github.com/Kamaiko/AutomationExercice.git
cd AutomationExercice
npm install
npx cypress verify

# Interactive
npm run cypress:open

# Headless
npm run cypress:run

# Focused
npx cypress run --spec "cypress/e2e/User/login.cy.js"
```

### Structure
```text
cypress/
├── e2e/          # specs by domain
├── fixtures/     # test data
├── support/      # commands & setup
├── screenshots/  # failure screenshots
└── reports/      # HTML reports
```

### Useful commands
```javascript
// cypress/support/commands.js
cy.signupUser(userData)
cy.loginUser(userData)
cy.getByDataQa(attr)
```

### Config (excerpt)
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

### Env vars
```bash
# .env.local
CYPRESS_BASE_URL=https://automationexercise.com
CYPRESS_API_BASE_URL=https://api.automationexercise.com
```

### Contributing
Small, focused PRs welcome. Please lint and ensure tests pass.

### License
ISC. See LICENSE.