// server/routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const claudeController = require('../controllers/claudeController');

const router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/', upload.single('resume'), claudeController.processResume);

module.exports = router;
