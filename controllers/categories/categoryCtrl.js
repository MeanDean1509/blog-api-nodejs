const { model } = require('mongoose');
const Category = require('../../model/Category/Category');
const { appErr } = require('../../utils/appErr');
//create
const createCategoryCtrl = async (req, res, next)=> {

    const { title } = req.body;
    try {

       const category = await Category.create({title, user: req.userAuth});
        res.json({
        status: 'success',
        data: category
        });
     
    } catch (error) {
        next(appErr(error.message, 400));
    }
};
//get all
const getAllCategoriesCtrl = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({
      status: 'success',
      data: categories
    });
    } catch (error) {
        next(appErr(error.message, 400));
    }
};
// get details
 const categoryDetailsCtrl =  async (req, res,next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: 'success',
      data: category
    });
  } catch (error) {
    next(appErr(error.message, 400));
  }
};
// DELETE/api/v1/categories/:id
 const deleteCategoryCtrl = async (req, res, next) => {
  try {
    
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      data: 'Category deleted successfully'
    });
  } catch (error) {
    next(appErr(error.message, 400));
  }
};
// PUT/api/v1/categories/:id
 const updateCategoryCtrl = async (req, res, next) => {
  try {
    const { title } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, 
        {title}, 
        {
            new: true,
            runValidators: true
        }
    );
    res.json({
      status: 'success',
      data: category
    });
  } catch (error) {
    next(appErr(error.message, 400));
  }
};
module.exports = {
    createCategoryCtrl,
    categoryDetailsCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl,
    getAllCategoriesCtrl
}