const express = require('express');
const router = express.Router();
const { addMenu } = require('../Controllers/menuController');
const { getOrders } = require('../Controllers/orderController');

// POST endpoint to insert menu
router.post('/menu', addMenu);

// POST route to place a new order
router.get('/orders', getOrders);


module.exports = router;