const { CanteenOrder } = require('../models/Orders');
const { UserOrder } = require('../models/Orders');
const Dish = require('../m odels/Menu'); // Assuming you have a Dish model for menu items
// Get all canteen orders with optional status filter
exports.getCanteenOrders = async (req, res) => {
  try {
    const { status } = req.query;
    
    // Set up filter based on status if provided
    const filter = status && status !== 'all' ? { status } : {};
    
    // Find canteen orders with the specified filter
    const orders = await CanteenOrder.find(filter)
      .populate('userId', 'name email')
      .sort({ placedAt: -1 }); // Sort by placement time, newest first
      
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
    
  } catch (error) {
    console.error('Error getting canteen orders:', error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching canteen orders",
      error: error.message
    });
  }
};

// Get a specific canteen order by ID
exports.getCanteenOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the canteen order by ID
    const order = await CanteenOrder.findById(id)
      .populate('userId', 'name email');
      
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No canteen order found with ID: ${id}`
      });
    }
    
    return res.status(200).json({
      success: true,
      data: order
    });
    
  } catch (error) {
    console.error('Error getting canteen order by ID:', error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching canteen order",
      error: error.message
    });
  }
};

// Update canteen order status
exports.updateCanteenOrderStatus = async (req, res) => {
  try {
    console.log("hello");
    const { id } = req.params;
    const { status } = req.body;

    console.log(id,status)
    
    // Validate status
    if (!status || !['pending', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Status is required and must be 'pending', 'completed', or 'cancelled'" 
      });
    }
    
    // Find and update the canteen order
    const updatedOrder = await CanteenOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');
    
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: `No canteen order found with ID: ${id}`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: `Canteen order status updated to ${status}`,
      data: updatedOrder
    });
    
  } catch (error) {
    console.error('Error updating canteen order status:', error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating canteen order status",
      error: error.message
    });
  }
};

// Get canteen orders statistics
exports.getCanteenOrderStats = async (req, res) => {
  try {
    const totalOrders = await CanteenOrder.countDocuments();
    const pendingOrders = await CanteenOrder.countDocuments({ status: 'pending' });
    const completedOrders = await CanteenOrder.countDocuments({ status: 'completed' });
    const cancelledOrders = await CanteenOrder.countDocuments({ status: 'cancelled' });
    
    // Calculate total revenue from completed orders
    const revenueResult = await CanteenOrder.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    
    return res.status(200).json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue
      }
    });
    
  } catch (error) {
    console.error('Error getting canteen order stats:', error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching canteen order statistics",
      error: error.message
    });
  }
};

exports.placeOrderForUserAndCanteen = async (req, res) => {
  try {
    console.log("hello");
    console.log(req.body);

    const { userId, dishes } = req.body;

    if (!userId || !Array.isArray(dishes) || dishes.length === 0) {
      return res.status(400).json({ success: false, message: "Missing or invalid fields" });
    }

    // Validate each dish entry
    for (const dish of dishes) {
      if (
        !dish.dishName ||
        typeof dish.quantity !== "number" ||
        dish.quantity <= 0 ||
        typeof dish.price !== "number" ||
        dish.price <= 0
      ) {
        return res.status(400).json({ success: false, message: "Invalid dish data" });
      }
    }

    // Calculate total amount safely on backend
    const totalAmount = dishes.reduce((total, dish) => {
      return total + dish.quantity * dish.price;
    }, 0);

    // Check and reduce the dish quantity in inventory or database (if applicable)
    for (const dish of dishes) {
      console.log(dish,dish.dishName);
      const existingDish = await Dish.findOne({ name: dish.dishName }); // Assuming there's a Dish model

      if (!existingDish) {
        return res.status(400).json({ success: false, message: `Dish ${dish.dishName} not found in inventory` });
      }

      console.log(existingDish);
      if (existingDish.quantity < dish.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough quantity for ${dish.name}. Available: ${existingDish.quantity}`,
        });
      }

      // Reduce the quantity in the inventory
      existingDish.quantityAvailable -= dish.quantity;
      await existingDish.save();
    }

    // Create user order
    const userOrder = new UserOrder({
      userId,
      dishes,
      totalAmount
    });

    // Create canteen order
    const canteenOrder = new CanteenOrder({
      userId,
      dishes,
      totalAmount
    });

    // Save both orders
    await userOrder.save();
    await canteenOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully in both user and canteen systems",
      userOrder,
      canteenOrder
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Server error placing order" });
  }
};