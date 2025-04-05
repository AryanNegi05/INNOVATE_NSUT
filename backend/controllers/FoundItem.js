const ClaimedRequest = require("../models/ClaimedRequest");
const FoundItem = require("../models/FoundItem");

// Get all found items
exports.getAllFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find()
      .populate("reportedBy", "firstName lastName email image")
      .sort({ createdAt: -1 });

    res.status(200).json(foundItems);
  } catch (error) {
    console.error("Error fetching found items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a claimed request
exports.createClaimedRequest = async (req, res) => {
  try {
    const { itemId, message, proofImage } = req.body;
    const requesterId = req.user.id;

    const item = await FoundItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const existing = await ClaimedRequest.findOne({
      item: itemId,
      requester: requesterId,
    });
    if (existing) {
      return res.status(400).json({ message: "You have already submitted a claim for this item." });
    }

    const claim = await ClaimedRequest.create({
      item: itemId,
      requester: requesterId,
      message,
      proofImage,
    });

    res.status(201).json({ message: "Claimed request submitted successfully", claim });
  } catch (error) {
    console.error("Error creating claimed request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all items reported by the logged-in user
exports.getMyListings = async (req, res) => {
  try {
    const userId = req.user.id;

    const myListings = await FoundItem.find({ reportedBy: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(myListings);
  } catch (error) {
    console.error("Error fetching user's listings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all claims submitted by the user
exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const myRequests = await ClaimedRequest.find({ requester: userId })
      .populate("item")
      .sort({ createdAt: -1 });

    res.status(200).json(myRequests);
  } catch (error) {
    console.error("Error fetching user's claimed requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all claims for items reported by the user
exports.getClaimsForMyItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const myItems = await FoundItem.find({ reportedBy: userId });
    const myItemIds = myItems.map(item => item._id);

    const claims = await ClaimedRequest.find({ item: { $in: myItemIds } })
      .populate("item")
      .populate("requester", "firstName lastName email image")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claims for user's items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update claim status (approve/reject/pending)
exports.updateClaimStatus = async (req, res) => {
  try {
    const { claimId, status } = req.body;
    const userId = req.user.id;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const claim = await ClaimedRequest.findById(claimId).populate("item");
    if (!claim) {
      return res.status(404).json({ message: "Claim request not found" });
    }

    const item = await FoundItem.findById(claim.item._id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.reportedBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this claim" });
    }

    claim.status = status;
    await claim.save();

    if (status === "approved") {
      item.status = "claimed";
      item.claimedBy = claim.requester;
      await item.save();
    }

    res.status(200).json({ message: `Claim ${status} successfully`, claim });
  } catch (error) {
    console.error("Error updating claim status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
