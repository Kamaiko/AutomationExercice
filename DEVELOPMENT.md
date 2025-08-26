🚀 Development Guide – Personal E2E Testing Project

Learning guide for practicing E2E testing and automation using AutomationExercise.com
 as a sandbox.
⚠️ Note: This project is NOT AutomationExercise.com. It is a student learning project for practicing QA procedures and automation testing.

📋 Table of Contents

🎯 Project Overview

🛠️ Tech Stack

🚀 Getting Started

🧪 Test Structure

⚙️ Configuration

🔄 CI/CD Workflow

📊 Reporting & Artifacts

🔧 Development Workflow

📚 Learning Objectives

🤝 Contributing

🎯 Project Overview

This project is a QA/SDET learning playground for practicing modern automation testing techniques. The site used is AutomationExercise.com
, solely for educational purposes.

Focus Areas:

🔍 End-to-end (E2E) testing with Cypress

🔄 CI/CD pipelines using GitHub Actions

📊 Professional reporting with Mochawesome

🏗️ Best practices in test organization and modular architecture

🚀 Hands-on DevOps workflow practice

🛠️ Tech Stack

Cypress 14.5.4 – E2E testing framework

Mocha – JavaScript test runner

Mochawesome – HTML test reports

Node.js 20.x – Runtime environment

npm 9.x – Package manager

Git – Version control

GitHub Actions – CI/CD automation

Postman – API testing (optional)

VS Code Recommended Extensions:

Cypress Snippets

ESLint

Prettier

GitLens

Thunder Client (API testing)

🚀 Getting Started
Prerequisites

Node.js 20.x or higher

npm 9.x or higher

Git

Installation
# Clone the repository
git clone https://github.com/Kamaiko/AutomationExercice.git
cd AutomationExercice

# Install dependencies
npm install

# Verify Cypress installation
npx cypress verify

Running Tests
# Open Cypress Test Runner (Interactive)
npm run cypress:open

# Run all tests headlessly
npm run cypress:run

# Run specific test
npx cypress run --spec "cypress/e2e/User/login.cy.js"

🧪 Test Structure
File Organization
cypress/
├── e2e/
│   ├── User/            # Authentication & profile tests
│   ├── Shop/            # Product & cart tests
│   ├── Checkout/        # Payment & checkout tests
│   ├── Contact/         # Contact form tests
│   └── UI_misc/         # General UI tests
├── fixtures/            # Test data
├── support/             # Custom commands & utilities
│   ├── commands.js
│   ├── e2e.js
│   └── utils/
├── screenshots/         # Failed test screenshots
└── reports/             # HTML test reports

Custom Commands
// Example custom commands
cy.signupUser(userData)
cy.loginUser(userData)
cy.getByDataQa(attribute)
cy.waitForPageLoad()

⚙️ Configuration
Cypress
// cypress.config.js
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    charts: true,
    reportPageTitle: 'E2E Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});

Environment Variables
# .env.local
CYPRESS_BASE_URL=https://automationexercise.com
CYPRESS_API_BASE_URL=https://api.automationexercise.com

🔄 CI/CD Workflow

Trigger on: push to main branch & pull requests

Pipeline includes:

Dependency installation & caching

Cypress verification & multi-browser testing

Parallel execution & artifact collection

Failure handling & reporting

📊 Reporting & Artifacts

Mochawesome HTML reports

Screenshots on test failures

Execution charts & analytics

7-day artifact retention

🔧 Development Workflow
# Stage, commit, and push
git add .
git commit -m "feat: add new test"
git push origin main


Best Practices:

Descriptive commit messages

Test-first development

Frequent commits with small changes

Branch protection for main branch

📚 Learning Objectives

Master Cypress E2E testing framework

Build reusable custom commands & Page Object Model

Implement CI/CD pipelines with GitHub Actions

Learn DevOps automation workflows

Understand enterprise QA best practices

Gain experience with API testing, performance, security, and mobile testing

🤝 Contributing

Fork the repository

Create a feature branch

Write comprehensive tests

Ensure CI/CD passes

Submit a pull request

Code Standards: ESLint, Prettier, Conventional Commits, test coverage

✅ Summary: This project is a student learning platform to practice QA/SDET workflows using AutomationExercise.com. It is not affiliated with AutomationExercise.com.
