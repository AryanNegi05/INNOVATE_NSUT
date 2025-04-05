const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./config/database');
const route = require('./Routes/Route');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to the database
database.connect();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Update with your front-end URL if needed
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api/v1', route);

const userRoutes = require('./routes/UserRoute');
const itemRoute = require('./routes/ItemRoute');

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/item', itemRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});