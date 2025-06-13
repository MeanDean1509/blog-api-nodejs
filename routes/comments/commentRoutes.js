const express = require('express');

const commentRouter = express.Router();

// POST/api/v1/comments
commentRouter.post('/', async (req, res)=> {
  try {
    // Logic to create a comment
    res.json({
      status: 'success',
      data: 'comment created'
    });
     
  } catch (error) {
      res.json({
        status: 'error',
        message: error.message
      });
  }
});
// GET/api/v1/comments/:id
commentRouter.get('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: `comment route`
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});
// DELETE/api/v1/comments/:id
commentRouter.delete('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'Comment deteted route'
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});


module.exports = commentRouter;