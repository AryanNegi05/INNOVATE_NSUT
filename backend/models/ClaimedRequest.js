const mongoose = require("mongoose");

const claimedRequestSchema = new mongoose.Schema(
  {
    // User who is claiming the item
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // The found item being claimed
    foundItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
      required: true,
    },

    // Message to describe the claim
    message: {
      type: String,
      trim: true,
    },

    // Proof of ownership - an image or document link (Cloudinary, S3, etc.)
    proof: {
      type: String,
      required: true,
    },

    // Status of the claim
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("claimedrequest", claimedRequestSchema);
