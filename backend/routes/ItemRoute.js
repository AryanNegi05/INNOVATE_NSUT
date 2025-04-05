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

const {auth , isStudent} = require('../middleware/auth')
const upload = require("../middleware/multer.middleware.js");
  

// Public routes (no authentication required)
router.get("/items", getAllFoundItems);
// Protected routes (authentication required)
router.get("/my-listings", auth, getMyListings);
router.get("/my-requests", auth, getMyRequests);
router.get("/claims-for-my-items", auth, getClaimsForMyItems);
router.post(
  '/claim',
  auth,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  createClaimedRequest
);
// router.put("/update-claim", auth, updateClaimStatus);

router.post(
  '/found-items',
  auth,
  isStudent,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  createFoundItem
);


module.exports = router;



