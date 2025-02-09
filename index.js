require('dotenv').config();
const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

// Initialize Express app
const app = express();
const port = 3000;

// Rate limit configuration: 10 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: 'Too many requests, please try again later.',
});

// Apply the rate limiting middleware to all routes
app.use(limiter);

// Helper function to make API requests securely
const makeGeminiAPIRequest = async (endpoint) => {
  const apiKey = process.env.GEMINI_API_KEY; // Use the API key from .env
  const url = `https://api.gemini.com${endpoint}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error contacting Gemini API:', error);
    throw new Error('API request failed');
  }
};

// Define route to handle Gemini API requests
app.get('/travel-recommendation', async (req, res) => {
  try {
    const data = await makeGeminiAPIRequest('/recommendations');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
