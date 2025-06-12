const express = require('express');
const userRouter = require('./routes/users/userRoutes');
const postRouter = require('./routes/posts/postRoutes');
const commentRouter = require('./routes/comments/commentRoutes');
const categoryRouter = require('./routes/categories/categoryRoutes');
require('dotenv').config(); 

require("./config/dbConnect"); // Import the database connection
const app = express();

// Middleware

//routes
//-----------------
// user routes

app.use('/api/v1/users/', userRouter);

//------------------
// post routes

app.use('/api/v1/posts/', postRouter);

//------------------
// comment routes

app.use('/api/v1/comments/', commentRouter);

//---------------
// category routes

app.use('/api/v1/categories/', categoryRouter);

// Error handling middleware

// Listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});