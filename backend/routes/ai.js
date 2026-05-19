const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const aiController = require('../controllers/aiController');

// @route   POST api/ai/analyze
// @desc    Analyze complaint text to get priority, department, summary, and autoResponse
router.post(
  '/analyze',
  [
    auth,
    check('title', 'Title is required for analysis').not().isEmpty(),
    check('description', 'Description is required for analysis').not().isEmpty()
  ],
  aiController.analyzeComplaint
);

module.exports = router;
