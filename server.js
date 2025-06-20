const express = require('express');
const userRouter = require('./routes/users/userRoutes');
const postRouter = require('./routes/posts/postRoutes');
const commentRouter = require('./routes/comments/commentRoutes');
const categoryRouter = require('./routes/categories/categoryRoutes');
const globalErrHandler = require('./middlewares/globalErrHandler');
require('dotenv').config(); 

require("./config/dbConnect"); // Import the database connection
const app = express();
app.use(express.json()); 
// Middleware

const userAuth = {
  isLogin: false,
  isAdmin: false,
};

app.use((req, res, next) => {
  // if (userAuth.isLogin) {
  // }
  // else {
  //   return res.json({
  //     msg: "Invalid login credentials",
  //   });
  // }
  next();
});
  
//routes

//home route

app.get('/', async (req, res) => {
  try {
    const post =await Post.find();
    res.status(200).json({
      message: 'Success',
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});
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
app.use(globalErrHandler);

//404 error
app.use( (req, res) => {
  res.status(404).json({

    message: `${req.originalUrl} Not Found`,
  });
});
// Listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});