const { validationResult } = require('express-validator');
const Complaint = require('../models/Complaint');

exports.searchComplaints = async (req, res) => {
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
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addComplaint = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, title, description, category, location, priority, department, summary, autoResponse } = req.body;

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
};

exports.updateComplaintStatus = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
};

exports.deleteComplaint = async (req, res) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    await Complaint.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Complaint removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
