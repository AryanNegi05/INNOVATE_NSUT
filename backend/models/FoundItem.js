const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    // Always "found" for this model
    status: {
      type: String,
      default: "found",
      enum: ["found"],
    },

    // Where the item was found (textual)
    landmark: {
      type: String,
      required: true,
      trim: true,
    },

    // Who reported the found item
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // Optional: flag to check if it has been claimed by the real owner
    // claimed: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoundItem", foundItemSchema);
