const express = require('express');
const { model } = require('mongoose');

const postRouter = express.Router();

// POST/api/v1/posts
postRouter.post('/', async (req, res)=> {
  try {
    // Logic to create a user
    res.json({
      status: 'success',
      data: 'post created'
    });
     
  } catch (error) {
      res.json({
        status: 'error',
        message: error.message
      });
  }
});



// GET/api/v1/posts/:id
postRouter.get('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: `post route`
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});
// GET/api/v1/posts
postRouter.get('/', async (req, res) => {
  try {
    // Logic to get all users
    res.json({
      status: 'success',
      data: 'posts route'
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});
//Delete/api/v1/posts/:id
postRouter.delete('/:id', async (req, res) => {
  try {
    
    res.json({
      status: 'success',
      data: 'Post deteted route'
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});

// PUT/api/v1/posts/:id
postRouter.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    // Logic to update a user by ID
    res.json({
      status: 'success',
      data: 'update post route',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = postRouter;