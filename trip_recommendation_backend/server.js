require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import Gemini SDK

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Initialize Gemini

app.post('/api/recommend', async (req, res) => {
    const { currentLocation, budget, days, preferences } = req.body;

    if (!currentLocation || !budget || !days || !preferences) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `Suggest a travel destination based on the following:\nLocation: ${currentLocation}\nBudget: ${budget} INR\nDays: ${days}\nPreferences: ${preferences}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ recommendation: text || 'No content available' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch recommendation' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
