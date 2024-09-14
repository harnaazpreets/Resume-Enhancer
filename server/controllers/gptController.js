// server/controllers/gptController.js
const gptService = require('../services/gptService');

exports.enhanceResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Resume text and job description are required.' });
    }

    // Get enhanced resume from OpenAI GPT API
    const enhancedResume = await gptService.enhanceResume(resumeText, jobDescription);

    // Optionally store the enhanced resume in the database

    res.json({ enhancedResume });
  } catch (error) {
    console.error('Error enhancing resume:', error);
    res.status(500).json({ error: 'An error occurred while enhancing the resume.' });
  }
};
