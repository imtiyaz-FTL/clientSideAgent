// agent/screenshot.js
// Takes screenshots and uploads them at random intervals (about 2 per minute)

const axios = require('axios');
const screenshot = require('screenshot-desktop');
const FormData = require('form-data');
const config = require('./config');

// Function to take a screenshot and upload
async function takeAndUploadScreenshot() {
  try {
    const imgBuffer = await screenshot({ format: 'png' });
    const form = new FormData();
    form.append('image', imgBuffer, { filename: 'screenshot.png', contentType: 'image/png' });
    form.append('sessionId', config.sessionId);

    const headers = {
      ...form.getHeaders(),
      Authorization: `Bearer ${config.token}`
    };
   await axios.post(`${config.API_BASE_URL}/screenshot/upload`, form, { headers });
    console.log('Screenshot uploaded');
  } catch (err) {
    console.error('Error taking/uploading screenshot:', err.message);
  }
}


function start() {
  function scheduleNext() {
    // const interval = 20000 + Math.random() * 40000; // between 20s and 60s
    setTimeout(async () => {
      await takeAndUploadScreenshot();
      scheduleNext();
    }, 20000);
  }
  scheduleNext();
}

module.exports = { start };
