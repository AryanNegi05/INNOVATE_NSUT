const Dish = require('../Models/Menu'); // Assuming you have a Dish model defined in Models/Menu.js

// POST /api/menu
const addMenu = async (req, res) => {
  try {
    const menuItems = req.body; // Expecting an array of dishes

    if (!Array.isArray(menuItems) || menuItems.length === 0) {
      return res.status(400).json({ message: 'Menu must be a non-empty array of dishes' });
    }

    const savedDishes = await Dish.insertMany(menuItems);

    res.status(201).json({
      message: 'Menu saved successfully',
      data: savedDishes
    });

  } catch (error) {
    console.error('Error saving menu:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addMenu };