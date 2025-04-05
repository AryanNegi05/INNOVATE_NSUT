// Import the Mongoose library
const mongoose = require("mongoose");

// Define the order schema for canteen orders
const canteenOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the user who placed the order
      required: true
    },
    dishes: [{
      dishName: String,
      quantity: Number,
      price: Number
    }],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    },
    placedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Define the order schema for user orders
const userOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the user placing the order
      required: true
    },
    dishes: [{
      dishName: String,
      quantity: Number,
      price: Number
    }],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    },
    placedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Export both models in an object
module.exports = {
  CanteenOrder: mongoose.model("CanteenOrder", canteenOrderSchema),
  UserOrder: mongoose.model("UserOrder", userOrderSchema)
};