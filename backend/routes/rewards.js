require('dotenv').config();
const axios = require('axios');

// Function to call Gemini AI API and get a reward message
const fetchAIMessage = async (habitName, targetDays, rewardType) => {
    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
            {
                contents: [{
                    parts: [{
                        text: `Generate a reward message for completing the habit "${habitName}" for ${targetDays} days. The reward type is "${rewardType}".`
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    key: process.env.GEMINI_AI_API_KEY
                }
            }
        );

        // Extract the generated text from the response
        const message = response.data.candidates[0].content.parts[0].text;
        return message;
    } catch (error) {
        console.error('Error fetching AI message from Gemini AI:', error);
        return 'An error occurred while generating a reward message from Gemini AI.';
    }
};

module.exports = { fetchAIMessage };
