const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    default: "Pending"
  },
  // AI fields
  priority: { type: String },
  department: { type: String },
  summary: { type: String },
  autoResponse: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
