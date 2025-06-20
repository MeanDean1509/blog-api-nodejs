const express = require('express');
const { userRegisterCtrl,
    userLoginCtrl, 
    userProfileCtrl, 
    UsersCtrl, 
    deleteUserCtrl, 
    updateUserCtrl,
    profilePictureUploadCtrl,
    whoViewdMyProfileCtrl,
    followingCtrl, 
    unfollowCtrl,
    blockUsersCtrl,
    unblockUserCtrl,
    adminBlockUserCtrl,
    adminUnblockUserCtrl, 
    updatePasswordCtrl,} = require('../../controllers/users/userCtrl');
const isLogin = require('../../middlewares/isLogin');
const storage = require('../../config/cloudinary');
const userRouter = express.Router();
const multer = require('multer');
const isAdmin = require('../../middlewares/isAdmin.js');


// instance of multer 
const upload = multer({ storage});
// Post/api/v1/users/register
userRouter.post('/register', userRegisterCtrl);

// post/api/v1/users/login
userRouter.post('/login', userLoginCtrl);

// GET/api/v1/users/profile/:id
userRouter.get('/profile', isLogin, userProfileCtrl);
// GET/api/v1/users
userRouter.get('/', UsersCtrl);
//Delete/api/v1/users/:id
userRouter.delete('/',isLogin, deleteUserCtrl);

// PUT/api/v1/users/:id
userRouter.put('/',isLogin, updateUserCtrl);

//GET/api/v1/users/profile-viewer/:id
userRouter.get('/profile-viewer/:id',isLogin, whoViewdMyProfileCtrl);

//GET/api/v1/users/following/:id
userRouter.get('/following/:id', isLogin, followingCtrl);

//GET/api/v1/users/unfollow/:id
userRouter.get('/unfollow/:id', isLogin, unfollowCtrl);
// GET/api/v1/users/block/:id
userRouter.get('/block/:id', isLogin, blockUsersCtrl);
// GET/api/v1/users/unblock/:id
userRouter.get('/unblock/:id', isLogin, unblockUserCtrl);
// GET/api/v1/users/admin-block/:id
userRouter.get('/admin-block/:id', isLogin, isAdmin, adminBlockUserCtrl);
// GET/api/v1/users/admin-unblock/:id
userRouter.get('/admin-unblock/:id', isLogin, isAdmin, adminUnblockUserCtrl);
// POST/api/v1/users/profile-picture
userRouter.post('/profile-photo-upload',
    isLogin,
    upload.single("profile"), 
    profilePictureUploadCtrl);
// PUT/api/v1/users/update-password
userRouter.put('/update-password', isLogin, updatePasswordCtrl);

module.exports = userRouter;