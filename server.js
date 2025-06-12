const express = require('express');
require('dotenv').config(); 

require("./config/dbConnect"); // Import the database connection
const app = express();

// Middleware

//routes

// Error handling middleware

// Listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});