const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");


// create a comment
const createCommentCtrl= async (req, res, next)=> {

    const { description } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.create({
        post: post._id,
        description,
        user: req.userAuth,
    });
    // add comment to post
    post.comments.push(comment._id);
    await post.save({validateBeforeSave: false});
    const user = await User.findById(req.userAuth);
    // add comment to user
    user.comments.push(comment._id);
    await user.save({validateBeforeSave: false});
    
    res.json({
      status: 'success',
      data: comment
    });
     
  } catch (error) {
      next(appErr(error.message, 500));
  }
};


// delete a comment
const deleteCommentCtrl =  async (req, res,next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
        return next(appErr('You are not authorized to delete this comment', 403));
    };
    await Comment.findByIdAndDelete(req.params.id);
    
    res.json({
      status: 'success',
      data: "Comment deleted successfully"
    });
  } catch (error) {
    next(appErr(error.message, 400));
  }
};

// update a comment
const updateCommentCtrl =  async (req, res, next) => {
    const { description } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
        return next(appErr('You are not authorized to update this comment', 403));
    };

    const commentupdate = await Comment.findByIdAndUpdate(req.params.id, 
        {description}, 
        {
            new: true,
            runValidators: true
        }
    );
    res.json({
      status: 'success',
      data: commentupdate
    });
  } catch (error) {
    next(appErr(error.message, 400));
  }
};
module.exports = {
    createCommentCtrl,
    deleteCommentCtrl,
    updateCommentCtrl
};
