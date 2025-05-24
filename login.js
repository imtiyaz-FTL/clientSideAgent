// agent/login.js
// Handles user login and obtains JWT and sessionId
// Installation: (already installed in agent directory)

const axios = require('axios');
const prompt = require('prompt-sync')({ sigint: true });
const config = require('./config');

async function login() {
  try {
    const username = prompt('Username: ');
    const password = prompt.hide('Password: ');
    const response = await axios.post(`${config.API_BASE_URL}/auth/login`, {
      username,
      password
    });
    const { token, sessionId } = response.data;
    config.token = token;
    config.sessionId = sessionId;
    console.log('Login successful. Session ID:', sessionId);
  } catch (err) {
    console.error('Login failed:', err.response ? err.response.data : err.message);
    process.exit(1);
  }
}

module.exports = { login };
