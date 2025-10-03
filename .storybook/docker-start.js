#!/usr/bin/env node

// This script is used to start Storybook in Docker without telemetry
process.env.STORYBOOK_DISABLE_TELEMETRY = '1';
process.env.CI = 'true';
// Suppress Vite warnings
process.env.VITE_ALLOW_HOSTS = 'true';
process.env.VITE_SUPPRESS_WARNINGS = 'true';

// Mock xdg-open to prevent errors
const originalSpawn = require('child_process').spawn;
require('child_process').spawn = function (cmd, args, options) {
  if (cmd === 'xdg-open') {
    // Return a mock process that does nothing
    return {
      on: () => {},
      stdout: { on: () => {} },
      stderr: { on: () => {} },
    };
  }
  return originalSpawn(cmd, args, options);
};

// Intercept console.log to filter out the allowedHosts warning
const originalConsoleLog = console.log;
console.log = function () {
  // Check if this is the allowedHosts warning
  const message = Array.from(arguments).join(' ');
  if (message.includes("'host' is set to '0.0.0.0' but 'allowedHosts' is not defined")) {
    // Skip logging this warning
    return;
  }
  // Pass through all other messages
  originalConsoleLog.apply(console, arguments);
};

// Run the Storybook CLI
// Use the full path to the Storybook binary
try {
  require('../node_modules/storybook/bin');
} catch (error) {
  console.error('Error loading Storybook:', error);
  try {
    // Try alternative path
    require('../node_modules/.bin/storybook');
  } catch (innerError) {
    console.error('Failed to load Storybook from alternative path:', innerError);
    process.exit(1);
  }
}
