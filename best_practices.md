# 📘 Project Best Practices

## 1. Project Purpose
This repository is an end-to-end (E2E) UI testing suite for the public website https://automationexercise.com using Cypress v14. It automates key user flows such as user signup, login, contact form submission, and general navigation. Tests are written in JavaScript with Cypress’s chaining model and use fixtures and custom commands to keep steps reusable.

## 2. Project Structure
- Root
  - `cypress.config.js` — Cypress configuration and Node event hooks (expand as needed)
  - `package.json` — Project metadata and dev dependency on Cypress
  - `best_practices.md` — This guide
- `cypress/`
  - `e2e/` — Test specs organized by feature/domain
    - `Contact/contact.cy.js` — Contact form flow
    - `User/login.cy.js` — Login flows (valid/invalid, logout)
    - `User/signup.cy.js` — User registration flows
    - `Checkout/checkout.cy.js`, `Shop/shop.cy.js`, `UI_misc/ui.cy.js` — Present but currently empty; grow tests here
  - `fixtures/`
    - `users.json` — Test users data used across scenarios
    - `Helloworld.txt` — Sample file for upload tests
  - `support/`
    - `commands.js` — Custom Cypress commands (signupUser, loginUser)
    - `e2e.js` — Global support, imports custom commands
    - `utils/userHelper.js` — Placeholder for reusable helpers (currently empty)
  - `downloads/`, `screenshots/` — Cypress outputs (when enabled)

Conventions observed:
- Tests grouped by feature folders (Contact, User, Shop, Checkout, UI_misc)
- Custom commands abstract repeated UI workflows (signupUser, loginUser)
- Fixtures provide reusable static test data (users.json)

Recommended configuration improvements:
- Set `baseUrl` in `cypress.config.js` to avoid hardcoding the full URL in tests
- Add `retries`, `viewportWidth/Height`, and `defaultCommandTimeout` tuned for stability on CI

Example `cypress.config.js` adjustments:
```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    retries: { runMode: 2, openMode: 0 },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },
  viewportWidth: 1366,
  viewportHeight: 768,
})
```

## 3. Test Strategy
- Framework: Cypress 14.x (E2E focus)
- Organization: Feature-oriented directories; one or more `.cy.js` specs per feature
- Data: `cy.fixture('users')` to hydrate test users; pass objects into custom commands
- Reuse: `Cypress.Commands` for complex flows (signup, login)
- Selectors: Prefer stable, intention-revealing attributes (data-qa). Avoid brittle CSS like `:nth-child()` when possible
- Assertions: Use `.should()` with visibility/text checks; pair with URL/route assertions when navigation is expected
- Test types:
  - End-to-End: Majority of current tests interact with the live site (network, UI)
  - Integration (recommended for stability): Use `cy.intercept()` to stub non-critical network calls when deterministic results are required
  - Component tests: Not used here
- Mocking/Stubbing philosophy:
  - Because this suite targets a public site, tests are susceptible to network flakiness and content changes. Stub selectively (e.g., banner calls, analytics) to reduce flakiness while keeping critical flows truly E2E
- Coverage expectations:
  - Prioritize core user journeys (signup, login, contact, checkout) with happy paths first
  - Add negative and edge cases next (invalid credentials, existing email, required-field validation)
- Session management:
  - Use `cy.session()` to cache authenticated state across tests for speed when appropriate

## 4. Code Style
- Language: JavaScript with Cypress’s Promise-like chaining; do not use async/await with Cypress commands
- Naming:
  - Specs: `feature-name.cy.js` within feature folders
  - Tests: Descriptive `it()` titles expressing scenario and expectation (avoid only numeric case IDs)
  - Variables: `camelCase` for variables/functions, `PascalCase` for classes (rare in tests)
- Selectors:
  - Prefer data attributes (e.g., `[data-qa="login-button"]`) and semantic queries (e.g., `cy.contains('text')` with context) over brittle `:nth-child()`
- Comments & language:
  - Keep comments concise and consistent; choose a single language for code comments and test titles. If the team is bilingual, prefer English for consistency with tooling/docs
- Assertions & timeouts:
  - Avoid arbitrary `cy.wait()`; rely on element state and route assertions. Tune command timeouts via config when needed
- Control flow:
  - Avoid `cy.pause()` in committed code. Use it locally during debugging only
- Reusability:
  - Keep custom commands pure and explicit. Return structured results (e.g., `{ status: 'created' | 'exists', user }`) so tests can branch deterministically
- Idempotency:
  - For signup flows, ensure unique emails (append timestamp or GUID) or delete users at the end to prevent data pollution

## 5. Common Patterns
- Custom Commands
  - `signupUser(user)` encapsulates registration steps and currently bails out early if email exists. Prefer returning a status to make test expectations explicit
  - `loginUser(user)` handles auth; consider `cy.session()` for caching
- Fixtures
  - `users.json` centralizes test data. Derive variants in tests (e.g., wrong email) by cloning and overriding fields
- Navigation
  - Use `baseUrl` + relative paths (`cy.visit('/')`). Assert URL via `cy.location('pathname')`
- File Upload
  - Use `cy.get('input[type="file"]').selectFile('cypress/fixtures/Helloworld.txt')`. Keep sample files small and under version control
- Network Control (recommended)
  - Use `cy.intercept()` to stub or assert key requests (form submissions, auth) and increase determinism
- Test Data Hygiene
  - If the app persists accounts, either delete at teardown or always generate unique identities

## 6. Do's and Don'ts
- Do
  - Configure `baseUrl`, retries, viewport, and default timeouts in `cypress.config.js`
  - Prefer `[data-*]` attributes and avoid brittle selectors
  - Centralize repeated flows in `Cypress.Commands`
  - Keep specs independent; do not rely on execution order or shared state
  - Use unique emails for signup (e.g., `user+{timestamp}@example.com`)
  - Add CI-friendly scripts: `cypress run` with JUnit/Mochawesome reporters if needed
  - Document preconditions and expected outcomes in `it()` titles
- Don't
  - Commit `cy.pause()` or `cy.wait(<arbitrary-ms>)` except as a last resort
  - Depend on `:nth-child()` ordering or dynamic text without context
  - Make tests depend on previous test success (no cascading failures)
  - Mix responsibilities in a single test; prefer smaller, focused scenarios

## 7. Tools & Dependencies
- Key dependency
  - Cypress ^14.5.4 — E2E test runner
- Suggested `package.json` scripts
```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "cy:run:headed": "cypress run --headed --browser chrome"
  }
}
```
- Setup
  - Node.js LTS recommended
  - Install: `npm ci` (or `npm install`)
  - Run headed: `npx cypress open`
  - Run headless: `npx cypress run`

## 8. Other Notes
- External site dependency: Since tests hit a public site, expect intermittent flakiness due to network or site changes. Mitigate with retries, resilient selectors, and limited stubbing
- Consistency: Standardize language across test names and comments
- Dead code: `cypress/support/utils/userHelper.js` is empty; implement helpers there or remove the file
- Custom commands contract: Adjust `signupUser` to return an explicit outcome so tests can assert correctly when an email already exists
- Stability: Replace `:nth-child()` selectors in specs and commands where feasible with stable attributes or text with scoping
- CI: Add reporters and artifacts (screenshots/videos) as needed for triage. Consider parallelization and test retries in CI
