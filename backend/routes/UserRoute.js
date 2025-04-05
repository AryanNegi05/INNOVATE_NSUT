const express = require("express");
const router = express.Router();

// ✅ Make sure these match the actual file and function names exactly
const { getAllFoundItems } = require("../controllers/FoundItem");
const { login, signup } = require("../controllers/Auth");

// 🔐 Auth routes
router.post("/login", login);
router.post("/signup", signup);

// 📦 Found items routes
router.get("/founditems", getAllFoundItems);

// 🚀 Export the router
module.exports = router;
