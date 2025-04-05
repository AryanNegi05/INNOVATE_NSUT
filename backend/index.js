const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./config/database');
const route = require('./Routes/Route');

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to database
database.connect();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // You can remove this if bodyParser.json() is already used

// Routes
app.use('/api/v1', route);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});