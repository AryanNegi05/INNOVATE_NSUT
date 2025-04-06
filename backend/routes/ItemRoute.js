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
    handleRequestAction,
  } = require("../controllers/FoundItem");

const {auth , isStudent} = require('../middleware/auth')
const upload = require("../middleware/multer.middleware.js");
  

// Public routes (no authentication required)
router.get("/items", getAllFoundItems);
// In your routes file
router.post("/approve", handleRequestAction);
// Protected routes (authentication required)
router.get("/my-listings", getMyListings);
router.get("/my-requests", getMyRequests);
router.get("/claims-for-my-items",  getClaimsForMyItems);
router.post(
  '/claim',
  auth,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  createClaimedRequest
);
 router.put("/update-claim", updateClaimStatus);

router.post(
  '/found-items',
  isStudent,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  createFoundItem
);


module.exports = router;



