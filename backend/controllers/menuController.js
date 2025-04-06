// controllers/menuController.js
const Dish = require('../models/Menu'); // Assuming your model is in models/Dish.js
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const multer = require('multer');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 5MB
  }
});

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Dish.find();
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get today's menu items
exports.getTodayMenu = async (req, res) => {
  try {
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    const todayMenu = await Dish.find({ date: today });
    
    res.status(200).json({
      success: true,
      count: todayMenu.length,
      date: today,
      data: todayMenu
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Add new menu item
exports.addMenuItem = async (req, res) => {
    try {
        // Log the request body for debugging
        console.log('Request body:', req.body);

        // Destructure the menu item data from req.body
        const { name, price, description, quantityAvailable, tags, category, isVegan, isVegetarian, isGlutenFree, prepTime, date } = req.body;
        const imageFile = req.file; // The uploaded image

        if (!imageFile) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Upload the image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(imageFile.buffer, {
            folder: 'menu_images', // Folder in Cloudinary
            use_filename: true, // Use the original filename
            unique_filename: false, // Avoid unique filenames
        });

        // Create a new dish object
        const newDish = new Dish({
            name,
            price,
            description,
            quantityAvailable,
            tags: JSON.parse(tags), // Convert tags from string to array
            image: uploadedImage.secure_url, // Store the Cloudinary image URL
            category,
            isVegan: JSON.parse(isVegan),
            isVegetarian: JSON.parse(isVegetarian),
            isGlutenFree: JSON.parse(isGlutenFree),
            prepTime,
            date,
        });

        // Save the dish to the database
        const savedDish = await newDish.save();

        // Send a response with the saved dish
        res.status(201).json({
            message: 'Dish added successfully',
            data: savedDish,
        });
    } catch (error) {
        console.error('Error saving dish:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Dish.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Upload today's menu (multiple items)
exports.uploadTodayMenu =async (req, res) => {
    try {
      // Check if image is provided
      console.log('Received file:', req);
      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'Image is required'
        });
      }
  
      // Convert buffer to base64 string for Cloudinary upload
      const fileStr = req.file.buffer.toString('base64');
      const fileType = req.file.mimetype;
      
      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${fileType};base64,${fileStr}`,
        {
          folder: 'menu-items', // Optional: organize uploads in a folder
          transformation: [
            { width: 800, crop: 'limit' }, // Optional: resize images
            { quality: 'auto' } // Optional: optimize quality
          ]
        }
      );
  
      // Parse tags if they are sent as JSON string
      let tags = req.body.tags;
      if (typeof tags === 'string') {
        try {
          tags = JSON.parse(tags);
        } catch (e) {
          tags = tags.split(',').map(tag => tag.trim());
        }
      }
  
      // Create new dish with Cloudinary image URL
      const newDish = new Dish({
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        quantityAvailable: parseInt(req.body.quantityAvailable),
        tags: tags,
        image: uploadResponse.secure_url, // Store secure URL from Cloudinary
        category: req.body.category,
        isVegan: req.body.isVegan === 'true',
        isVegetarian: req.body.isVegetarian === 'true',
        isGlutenFree: req.body.isGlutenFree === 'true',
        prepTime: parseInt(req.body.prepTime),
        date: req.body.date || new Date().toISOString().split('T')[0] // Use provided date or today
      });
  
      await newDish.save();
  
      res.status(201).json({
        status: 'success',
        data: newDish
      });
    } catch (err) {
      console.error('Error uploading to Cloudinary or saving to DB:', err);
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  };

// Update today's menu items
exports.updateTodayMenu = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log(`Received request to update today's menu for date: ${today}`);

    // First, remove all of today's menu items
    console.log(`Deleting existing menu items for date: ${today}`);
    const deleteResult = await Dish.deleteMany({ date: today });
    console.log(`Deleted ${deleteResult.deletedCount} items from the menu`);
    // Respond with the newly added menu items
    res.status(200).json({
      success: true,
      count: result.length,
      // data: result
    });
  } catch (error) {
    console.error("Error updating today's menu:", error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};