const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },

  // You can either store dish names or reference actual Dish documents
  items: [{
    type: String,
    required: true
  }],

  time: {
    type: Date,
    default: Date.now // Automatically records order time
  },

  date: {
    type: String,
    required: true // Can use ISO date or "YYYY-MM-DD"
  },

  comment: {
    type: String,
    trim: true
  },

  status: {
    type: String,
    enum: ['pending','completed', 'cancelled'],
    default: 'pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);