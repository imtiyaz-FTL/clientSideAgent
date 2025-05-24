// agent/app-usage.js
// Monitors the active application and logs usage durations

const axios = require('axios');
const ActiveWindow = require('@paymoapp/active-window');
const config = require('./config');

// Function to send app usage log to the backend
async function sendUsageLog(appName, startTime, endTime) {
  try {
    const data = {
      application: appName,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      sessionId: config.sessionId
    };
    await axios.post(`${config.API_BASE_URL}/app-usage`, data, {
      headers: { Authorization: `Bearer ${config.token}` }
    });
    console.log(`Logged usage of "${appName}"`);
  } catch (err) {
    console.error('Error sending usage log:', err.message);
  }
}

// Start tracking active window changes
function start() {
  ActiveWindow.initialize();
  // For MacOS: check screen recording permission (optional)
  if (typeof ActiveWindow.requestPermissions === 'function') {
    const ok = ActiveWindow.requestPermissions();
    if (!ok) {
      console.error('Error: screen recording permission not granted.');
      process.exit(1);
    }
  }

  let lastApp = null;
  let lastStart = new Date();

  // Initialize with the current active window
  try {
    const win = ActiveWindow.getActiveWindow();
    lastApp = win ? win.application : 'Unknown';
    lastStart = new Date();
  } catch (e) {
    lastApp = 'Unknown';
    lastStart = new Date();
  }

  // Subscribe to window change events
  ActiveWindow.subscribe((win) => {
    const now = new Date();
    if (!win) return;
    const currentApp = win.application;
    if (currentApp !== lastApp) {
      // Log the previous application's usage
      sendUsageLog(lastApp, lastStart, now);
      // Update to new app
      lastApp = currentApp;
      lastStart = now;
    }
  });
}

module.exports = { start };
