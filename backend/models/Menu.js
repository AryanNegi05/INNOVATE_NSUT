const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true }, // This will store the Cloudinary image URL
  category: { type: String, required: true },
  isVegan: { type: Boolean, required: true },
  isVegetarian: { type: Boolean, required: true },
  isGlutenFree: { type: Boolean, required: true },
  prepTime: { type: Number, required: true },
  date: { type: String, required: true }, // Date of the menu, e.g., '2025-04-05'
  createdAt: { type: Date, default: Date.now } // Automatically set the creation date
});

module.exports = mongoose.model('Dish', menuSchema);