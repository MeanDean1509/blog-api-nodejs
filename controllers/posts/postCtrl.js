const Post = require('../../model/Post/Post');
const User = require('../../model/User/User');
const { appErr } = require('../../utils/appErr');

// Create a new post
const createPostCtrl = async (req, res, next) => {
  
  const { title, description, category} = req.body;
    try {
        const author = await User.findById(req.userAuth);
        //check if the user is blocked
        if (author.isBlocked) {
          return next(appErr('Access denied, you are blocked', 403));

        }

        const postCreated = await Post.create({
            title,
            description,
            user: author._id,
            category,
            photo: req?.file?.path,
        });
        author.posts.push(postCreated);
        await author.save();
        res.status(201).json({
            status: 'success',
            data: postCreated
        });

    } catch (error) {
        next(appErr(error.message, 500));
    }
}


// get post details 
const postDetailsCtrl =  async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    // Number of views
    //check if user viewed the post
    const isViewed = post.numViews.includes(req.userAuth);
    if (isViewed) {
      return res.json({
        status: 'success',
        data: post
      });
    }
    else {
      // if not viewed, add user to numViews
      post.numViews.push(req.userAuth);
      await post.save();
      res.json({
        status: 'success',
        data: post
      });

    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};
// get all posts
const getAllPostCtrl =  async (req, res, next) => {
  try {
    //find all posts
    const posts = await Post.find({}).populate('user').populate('category','title');
    const filteredPosts = posts.filter(post => {
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuth);
      
      return isBlocked ? null : post;
    });
    res.json({
      status: 'success',
      data: filteredPosts
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// toggleLike
const toggleLikesPostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(appErr('Post not found', 404));
    }

    const userId = req.userAuth;

    const isLiked = post.likes.includes(userId);
    const isDisliked = post.dislikes.includes(userId); // 👈 kiểm tra xem đã từng dislike chưa

    if (isLiked) {
      // Gỡ like
      post.likes = post.likes.filter(
        like => like.toString() !== userId.toString()
      );
    } else {
      // Thêm like
      post.likes.push(userId);

      // Nếu đang dislike thì gỡ dislike
      if (isDisliked) {
        post.dislikes = post.dislikes.filter(
          dislike => dislike.toString() !== userId.toString()
        );
      }
    }

    await post.save();

    res.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};


// Toggle dislike on a post
const toggleDislikePostCtrl = async (req, res, next ) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(appErr('Post not found', 404));
    }

    const userId = req.userAuth;

    const isDisliked = post.dislikes.includes(userId);
    const isLiked = post.likes.includes(userId); // nếu user từng like thì gỡ like trước

    if (isDisliked) {
      // Gỡ dislike
      post.dislikes = post.dislikes.filter(
        dislike => dislike.toString() !== userId.toString()
      );
    } else {
      // Thêm dislike
      post.dislikes.push(userId);

      // Nếu đang like thì bỏ like luôn
      if (isLiked) {
        post.likes = post.likes.filter(
          like => like.toString() !== userId.toString()
        );
      }
    }

    await post.save();

    res.json({
      status: 'success',
      data: post
    });

  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// Delete a post
const deletePostCtrl =  async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post belongs to the user
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr('You are not authorized to delete this post', 403));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
      data: 'Post deleted successfully'
    });
  } catch (error) {
    next(appErr(error.message, 500));
  };

};

// Update a post
const updatePostCtrl =  async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    // check if the post belongs to the user
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr('You are not authorized to update this post', 403));
    }
    await Post.findByIdAndUpdate(req.params.id,{
      title,
      description,
      category,
      photo: req?.file?.path
    }, {
      new: true,
      runValidators: true
    });
    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(appErr(error.message, 500));
  };
};


module.exports = {createPostCtrl,
  postDetailsCtrl, 
  deletePostCtrl, 
  updatePostCtrl, 
  getAllPostCtrl,
  toggleLikesPostCtrl,
  toggleDislikePostCtrl
};
