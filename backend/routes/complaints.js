const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const complaintController = require('../controllers/complaintController');

// @route   GET api/complaints/search
// @desc    Search complaints by location
router.get('/search', auth, complaintController.searchComplaints);

// @route   GET api/complaints
// @desc    Get all complaints
router.get('/', auth, complaintController.getAllComplaints);

// @route   POST api/complaints
// @desc    Add new complaint
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty()
  ],
  complaintController.addComplaint
);

// @route   PUT api/complaints/:id
// @desc    Update complaint status
router.put(
  '/:id',
  [
    auth,
    check('status', 'Status is required').not().isEmpty()
  ],
  complaintController.updateComplaintStatus
);

// @route   DELETE api/complaints/:id
// @desc    Delete complaint
router.delete('/:id', auth, complaintController.deleteComplaint);

module.exports = router;
