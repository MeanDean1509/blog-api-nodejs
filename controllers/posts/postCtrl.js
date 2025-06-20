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
        });
        author.posts.push(postCreated);
        await author.save();
        res.status(201).json({
            status: 'success',
            data: postCreated
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}


// get post details 
const postDetailsCtrl =  async (req, res) => {
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
};
// get all posts
const getAllPostCtrl =  async (req, res) => {
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
};
// Delete a post
const deletePostCtrl =  async (req, res) => {
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
};

// Update a post
const updatePostCtrl =  async (req, res) => {
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
};


module.exports = {createPostCtrl,};
