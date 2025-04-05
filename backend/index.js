const express = require('express')
const app = express();
const database = require('./config/database')

require('dotenv').config()
const PORT = process.env.PORT;

const cors = require("cors")


app.use(express.json());

// Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the backend!');
// });

// // Example POST route
// app.post('/api/data', (req, res) => {
//   const { name } = req.body;
//   res.json({ message: `Hello, ${name}` });
// });
database.connect();
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});