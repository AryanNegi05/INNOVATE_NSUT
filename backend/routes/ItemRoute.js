const express = require("express")
const {getAllFoundItems} = require('../controllers/foundItems')
const { createClaimedRequest } = require("../controllers/claimedRequestController");

const router = express.Router()

// Import the required controllers and middleware functions


const {
  getAllFoundItems,
  createClaimedRequest,
  getMyListings,
  getMyRequests,
  getClaimsForMyItems,
  updateClaimStatus,
  searchFoundItems
} = require("../controllers/yourControllerFile"); // Update with your actual file path

// Public routes (no authentication required)
router.get("/items", getAllFoundItems);
router.get("/search", searchFoundItems);

// Protected routes (authentication required)
router.get("/my-listings", getMyListings);
router.get("/my-requests", getMyRequests);
router.get("/claims-for-my-items", getClaimsForMyItems);
router.post("/claim", createClaimedRequest);
router.put("/update-claim", updateClaimStatus);

module.exports = router;

