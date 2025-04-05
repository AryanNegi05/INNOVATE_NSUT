const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  quantityAvailable: { type: Number, required: true },
  tags: [String],
  image: { type: String },
  popularity: { type: Number, default: 0 },
}, { timestamps: true }); // Add createdAt and updatedAt fields

module.exports = mongoose.model('Dish', DishSchema);