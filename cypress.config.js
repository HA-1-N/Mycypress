const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "dung",
    specPattern: "./cypress/tests/*/*",
    baseUrl: "http://localhost:4200"
  },
  defaultCommandTimeout: 1000
});
