const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    charts: true,
    reportPageTitle: 'AutomationExercise E2E Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});