const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @route   POST api/ai/analyze
// @desc    Analyze complaint text to get priority, department, summary, and autoResponse
router.post('/analyze', auth, async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: 'Title and description are required for analysis' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Mock response if API key is missing or default
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.log('Using mock AI response since GEMINI_API_KEY is not set properly.');
      let priority = 'Medium';
      let department = 'General Services';
      
      if (category.toLowerCase().includes('water')) department = 'Water Department';
      if (category.toLowerCase().includes('electric')) { department = 'Electricity Board'; priority = 'High'; }
      if (category.toLowerCase().includes('garbage')) department = 'Sanitation Department';

      return res.json({
        priority,
        department,
        summary: `Mock Summary: The issue is about ${title}.`,
        autoResponse: `Dear user, we have received your complaint regarding "${title}". The ${department} will look into it.`
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze the following complaint:
    Title: ${title}
    Category: ${category}
    Description: ${description}

    Return a JSON object with EXACTLY the following keys (no markdown, just raw JSON):
    "priority": "Low", "Medium", or "High"
    "department": "Suggested department to handle this (e.g., Water Department, Electricity Board, Sanitation Department, etc.)"
    "summary": "A one-sentence summary of the complaint"
    "autoResponse": "A polite auto-generated response message to the user acknowledging the issue."
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting from Gemini
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedData = JSON.parse(text);

    res.json(parsedData);
  } catch (err) {
    console.error('AI Analysis Error:', err.message);
    res.status(500).send('AI Service Error');
  }
});

module.exports = router;
