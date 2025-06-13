const express = require('express');

const categoryRouter = express.Router();

// POST/api/v1/categories
categoryRouter.post('/', async (req, res)=> {
  try {
    // Logic to create a category
    res.json({
      status: 'success',
      data: 'category created'
    });
     
  } catch (error) {
      res.json({
        status: 'error',
        message: error.message
      });
  }
});
// GET/api/v1/categories/:id
categoryRouter.get('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: `category route`
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});
// DELETE/api/v1/categories/:id
categoryRouter.delete('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'Category deteted route'
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});
// PUT/api/v1/categories/:id
categoryRouter.put('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update category route',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = categoryRouter;