// agent/index.js
// Main entry point: log in then start monitoring

// Installation: node index.js (after npm installing dependencies)

const { login } = require("./login");
const screenshot = require("./screenshot");
const appUsage = require("./app-usage");

async function main() {
  await login(); // Prompt for credentials and obtain token/session
  screenshot.start(); // Start taking screenshots
  //   appUsage.start();       // Start tracking active app usage
}

main();
