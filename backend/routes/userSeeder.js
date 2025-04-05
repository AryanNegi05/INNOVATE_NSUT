const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

// Dummy data (image is omitted for now)
const dummyUsers = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "hashedPassword1",
    accountType: "Student",
    token: "token123",
    image: "https://via.placeholder.com/150"
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    password: "hashedPassword2",
    accountType: "Admin",
    token: "token456",
    image: "https://via.placeholder.com/150"
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    password: "hashedPassword3",
    accountType: "Student",
    token: "token789",
    image: "https://via.placeholder.com/150"
  },
  {
    firstName: "Diana",
    lastName: "Evans",
    email: "diana.evans@example.com",
    password: "hashedPassword4",
    accountType: "Student",
    token: "",
    image: "https://via.placeholder.com/150"
  },
  {
    firstName: "Edward",
    lastName: "Thompson",
    email: "edward.thompson@example.com",
    password: "hashedPassword5",
    accountType: "Admin",
    token: "resettoken321",
    image: "https://via.placeholder.com/150"
  },
];

// @route   POST /seed-users
// @desc    Insert dummy users into database
// @access  Public (for demo - you can protect this)
router.post("/seed-users", async (req, res) => {
  try {
    // Optional: Clear existing users
    // await User.deleteMany({});

    const savedUsers = await User.insertMany(dummyUsers);
    res.status(201).json({ message: "Users seeded successfully", savedUsers });
  } catch (error) {
    console.error("Error seeding users:", error);
    res.status(500).json({ message: "Failed to seed users", error });
  }
});

module.exports = router;
