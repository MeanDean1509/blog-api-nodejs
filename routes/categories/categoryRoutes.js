const express = require('express');
const { 
  createCategoryCtrl,
  categoryDetailsCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
  getAllCategoriesCtrl
 } = require('../../controllers/categories/categoryCtrl');
const isLogin = require('../../middlewares/isLogin');
const categoryRouter = express.Router();

// POST/api/v1/categories
categoryRouter.post('/', isLogin, createCategoryCtrl);

// GET/api/v1/categories/:id
categoryRouter.get('/:id', categoryDetailsCtrl);

// DELETE/api/v1/categories/
categoryRouter.delete('/:id', isLogin, deleteCategoryCtrl);
// PUT/api/v1/categories/:id
categoryRouter.put('/:id', isLogin, updateCategoryCtrl);
// GET/api/v1/categories
categoryRouter.get('/', getAllCategoriesCtrl);

module.exports = categoryRouter;