// server/controllers/resumeController.js
const latexService = require('../services/latexService');

exports.generateResumePDF = async (req, res) => {
  try {
    const enhancedResume = req.body.enhancedResume;

    if (!enhancedResume) {
      return res.status(400).json({ error: 'Enhanced resume text is required.' });
    }

    // Generate PDF from LaTeX template
    const pdfBuffer = await latexService.generatePDF(enhancedResume);

    // Set response headers for PDF download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Enhanced_Resume.pdf"',
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'An error occurred while generating the PDF.' });
  }
};
