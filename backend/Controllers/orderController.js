const Order = require('../Models/Orders');

// GET /api/v1/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Most recent first
    console.log(orders);
    res.status(200).json({
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getOrders };