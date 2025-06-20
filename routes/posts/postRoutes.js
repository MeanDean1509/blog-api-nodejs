const express = require('express');
const storage = require('../../config/cloudinary');
const multer = require('multer');
const { createPostCtrl,
  postDetailsCtrl,
  getAllPostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  toggleLikesPostCtrl,
  toggleDislikePostCtrl
 } = require('../../controllers/posts/postCtrl');

const isLogin = require('../../middlewares/isLogin');

const postRouter = express.Router();

// Multer configuration for file upload
const upload = multer({ storage });

// POST/api/v1/posts
postRouter.post('/', isLogin, upload.single("image"), createPostCtrl);
 

// GET/api/v1/posts/:id
postRouter.get('/:id',isLogin, postDetailsCtrl);

// GET/api/v1/posts
postRouter.get('/',isLogin, getAllPostCtrl);

//Delete/api/v1/posts/:id
postRouter.delete('/:id', isLogin, deletePostCtrl);


// PUT/api/v1/posts/:id
postRouter.put('/:id', isLogin, upload.single("image"), updatePostCtrl);

// POST/api/v1/posts/like/:id
postRouter.get('/like/:id', isLogin, toggleLikesPostCtrl);

// POST/api/v1/posts/dislike/:id
postRouter.get('/dislike/:id', isLogin, toggleDislikePostCtrl);
module.exports = postRouter;