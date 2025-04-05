const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    // Who is making the request
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // Which found item is being requested
    foundItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "founditem",
      required: true,
    },

    // Optional message explaining why they think it's theirs
    message: {
      type: String,
      trim: true,
    },

    // Request status
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("request", requestSchema);
