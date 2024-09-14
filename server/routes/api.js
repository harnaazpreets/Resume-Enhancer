// server/routes/api.js
const express = require('express');
const uploadRoutes = require('./upload');
const authRoutes = require('./auth');
const gptController = require('../controllers/gptController');
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use('/upload', auth, uploadRoutes);
router.use('/auth', authRoutes);

// Route to enhance resume (protected)
router.post('/enhance', auth, gptController.enhanceResume);

// Route to generate PDF (protected)
router.post('/generate-pdf', auth, resumeController.generateResumePDF);

module.exports = router;
