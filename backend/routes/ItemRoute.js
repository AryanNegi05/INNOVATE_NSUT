const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions


const {
    getAllFoundItems,
    createFoundItem, // <-- ADD THIS
    createClaimedRequest,
    getMyListings,
    getMyRequests,
    getClaimsForMyItems,
    updateClaimStatus,
    
  } = require("../controllers/FoundItem");
  

// Public routes (no authentication required)
router.get("/items", getAllFoundItems);


// Protected routes (authentication required)
router.get("/my-listings", getMyListings);
router.get("/my-requests", getMyRequests);
router.get("/claims-for-my-items", getClaimsForMyItems);
router.post("/claim", createClaimedRequest);
router.put("/update-claim", updateClaimStatus);


module.exports = router;



