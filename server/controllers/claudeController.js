// server/controllers/claudeController.js
const claudeService = require('../services/claudeService');
const parseResume = require('../utils/parseResume');

exports.processResume = async (req, res) => {
  try {
    const resumeFile = req.file;
    const jobDescription = req.body.jobDescription;

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({ error: 'Resume and job description are required.' });
    }

    // Parse the resume file (convert PDF to text if necessary)
    const resumeText = await parseResume(resumeFile);

    // Send data to Claude API for feedback
    const feedback = await claudeService.getFeedback(resumeText, jobDescription);

    res.json({ feedback });
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ error: 'An error occurred while processing the resume.' });
  }
};
