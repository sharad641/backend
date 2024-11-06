// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCudBa9ke6wK_QN4eikjkr7qopm2b5S2DM'; // Gemini API URL

// POST route to handle user input
app.post('/chatbot', async (req, res) => {
    try {
        const { message } = req.body;

        // Call the Gemini API
        const response = await axios.post(GEMINI_API_URL, {
            message: message,
            api_key: process.env.GEMINI_API_KEY,
        });

        res.json({ reply: response.data.reply });
    } catch (error) {
        console.error('Error with Gemini API:', error);
        res.status(500).json({ error: 'Failed to get a response from the chatbot API' });
    }
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
