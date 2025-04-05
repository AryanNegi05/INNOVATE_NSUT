const express = require('express')
const app = express();
const database = require('./config/database')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require("cors")
app.use(
  cors({
    origin:'http://localhost:5173',
    credentials :true,
  })
)
app.use(express.json());

const userRoutes = require('./routes/UserRoute')
const itemRoute = require('./routes/ItemRoute')
const PORT = process.env.PORT;

database.connect();
app.use('/api/v1/auth',userRoutes)
// app.use('/api/v1/item', itemRoute);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});