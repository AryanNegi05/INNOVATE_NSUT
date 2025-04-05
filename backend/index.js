// 1. Import required packages
const express = require('express');
const app = express();
const database = require('./config/database');
require('dotenv').config(); // make sure env variables are loaded early
const cookieParser = require('cookie-parser');
const cors = require("cors");

// 2. Middleware setup (CORS and parsers)
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true               // to allow cookies from frontend
}));

app.use(cookieParser());           // enables req.cookies
app.use(express.json());           // enables req.body for JSON
app.use(express.urlencoded({ extended: true })); // enables req.body for form data

// 3. Connect to the database
database.connect();

// 4. Route registration
const userRoutes = require('./routes/UserRoute');
const itemRoute = require('./routes/ItemRoute');

app.use('/api/v1/auth', userRoutes);  // e.g., /api/v1/auth/login
app.use('/api/v1/item', itemRoute);  // e.g., /api/v1/item/add

// 5. Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
