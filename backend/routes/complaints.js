const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Complaint = require('../models/Complaint');

// @route   GET api/complaints/search
// @desc    Search complaints by location
router.get('/search', auth, async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ msg: 'Location query parameter is required' });
    }
    const complaints = await Complaint.find({ location: { $regex: location, $options: 'i' } }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/complaints
// @desc    Get all complaints
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/complaints
// @desc    Add new complaint
router.post('/', auth, async (req, res) => {
  const { name, email, title, description, category, location, priority, department, summary, autoResponse } = req.body;

  if(!title || !email) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const newComplaint = new Complaint({
      name,
      email,
      title,
      description,
      category,
      location,
      priority,
      department,
      summary,
      autoResponse
    });

    const complaint = await newComplaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/complaints/:id
// @desc    Update complaint status
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/complaints/:id
// @desc    Delete complaint
router.delete('/:id', auth, async (req, res) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    await Complaint.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Complaint removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
