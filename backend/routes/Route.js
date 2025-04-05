const express = require('express');
const router = express.Router();
const { 
  getCanteenOrders, 
  getCanteenOrderById, 
  updateCanteenOrderStatus,
  getCanteenOrderStats,
  placeOrderForUserAndCanteen
} = require('../Controllers/orderController');
const {Gemini} = require('../controllers/Gemini');
// POST endpoint to insert menu
const menuController = require('../controllers/menuController');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Dish = require('../Models/Menu'); // Your Mongoose model
const { Gemini2 } = require('../controllers/Gemini2');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 5MB
  }
});

// Define routes
router.get('/menu', menuController.getAllMenuItems);
router.post('/menu', menuController.addMenuItem);
router.put('/menu/:id', menuController.updateMenuItem);
router.delete('/menu/:id', menuController.deleteMenuItem);

router.get('/todaymenu', menuController.getTodayMenu);
// router.post('/todaymenu', menuController.uploadTodayMenu);
router.post('/todaymenu', upload.single('image'), menuController.uploadTodayMenu);

router.put('/todaymenu', menuController.updateTodayMenu);
router.post('/aibaseddishes', Gemini);
router.post('/aibasedsuggestion', Gemini2);

// POST route to place a new order

router.get('/canteen/orders', getCanteenOrders);
router.put('/canteen/orders/:id', updateCanteenOrderStatus);

// Get canteen order statistics
// Example: GET /api/canteen/orders/stats
router.get('/orders/stats', getCanteenOrderStats);

// Get a specific canteen order by ID
// Example: GET /api/canteen/orders/60d21b4667d0d8992e610c85
router.get('/orders/:id', getCanteenOrderById);

// Update canteen order status
// Example: PUT /api/canteen/orders/60d21b4667d0d8992e610c85
// router.put('/orders/:id', updateCanteenOrderStatus);

router.post("/place-order", placeOrderForUserAndCanteen);

module.exports = router;