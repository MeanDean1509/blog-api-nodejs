const bcrypt = require('bcryptjs');
const User = require('../../model/User/User'); 
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
const {appErr, AppErr} = require('../../utils/appErr');

//Rerister
const userRegisterCtrl = async (req, res, next)=> {
  const {firstname, lastname, profilePhoto, email, password } = req.body;
  try {

    // Logic to create a user
    // Check email existence
    const userFound = await User.findOne({ email });
    if(userFound) {
      return next(new AppErr('User already exists', 500));
      
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: 'success',
      data: user,
    });
     
  } catch (error) {
      next(appErr(error.message));
    }
};

// Login
const userLoginCtrl = async (req, res) => {
  const {email, password} = req.body;
  try {
    // Logic to login a user
    // Check email existence
    const userFound = await User.findOne({ email });
    if(!userFound) {
      return res.json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    //verify password
    const isPasswordMatches = await bcrypt.compare(password, userFound.password);
    if(!isPasswordMatches) {
      return res.json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    res.json({
      status: 'success',
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id)
      }
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};

// who views the profile
const whoViewdMyProfileCtrl = async (req, res, next) => {
  try {
    // find the original user
    const user = await User.findById(req.params.id);
    // find the user who viewed the profile
    const userWhoViewed = await User.findById(req.userAuth);
    // check original user and viewer are found
    if (user && userWhoViewed) {
      const isUserAlreadyViewed = user.viewers.find(viewers => viewers.toString() === userWhoViewed._id.toJSON());
      if (isUserAlreadyViewed) {
        return next(appErr('You have already viewed this profile', 400));
    }
    else {
      user.viewers.push(userWhoViewed._id);
      await user.save();
  
      res.json({
        status: 'success',
        data: 'You have successfully viewed the profile',
      });
    }
  }
  } catch (error) {
    res.json(error.message);
  }
};

//following
const followingCtrl = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const userWhoFollowed = await User.findById(req.userAuth);

    if (!userToFollow || !userWhoFollowed) {
      return next(appErr('User not found', 404));
    }

    const isAlreadyFollowed = userToFollow.followers.find(
      follower => follower.toString() === userWhoFollowed._id.toString()
    );

    if (isAlreadyFollowed) {
      return next(appErr('You are already following this user', 400));
    }

    userToFollow.followers.push(userWhoFollowed._id);
    userWhoFollowed.following.push(userToFollow._id);

    await userToFollow.save();
    await userWhoFollowed.save();

    return res.json({
      status: 'success',
      data: 'You are successfully following this user',
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

// unfollow 
const unfollowCtrl = async (req, res, next) => {
  try {
    // Tìm người bị bỏ theo dõi
    const userToUnfollow = await User.findById(req.params.id);
    // Tìm người đang bỏ theo dõi
    const userWhoUnfollowed = await User.findById(req.userAuth);

    if (!userToUnfollow || !userWhoUnfollowed) {
      return next(appErr('User not found', 404));
    }

    // Kiểm tra xem người dùng đã theo dõi trước đó chưa
    const isFollowing = userToUnfollow.followers.find(
      follower => follower.toString() === userWhoUnfollowed._id.toString()
    );

    if (!isFollowing) {
      return next(appErr('You are not following this user', 400));
    }

    // Xóa ID khỏi followers của người bị bỏ theo dõi
    userToUnfollow.followers = userToUnfollow.followers.filter(
      follower => follower.toString() !== userWhoUnfollowed._id.toString()
    );

    // Xóa ID khỏi following của người đang bỏ theo dõi
    userWhoUnfollowed.following = userWhoUnfollowed.following.filter(
      following => following.toString() !== userToUnfollow._id.toString()
    );

    await userToUnfollow.save();
    await userWhoUnfollowed.save();

    return res.json({
      status: 'success',
      data: 'You have successfully unfollowed this user',
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};



// profile
const userProfileCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all users
const UsersCtrl = async (req, res) => {
  try {
    // Logic to get all users
    res.json({
      status: 'success',
      data: 'all users route'
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};

//block
const blockUsersCtrl = async (req, res, next) => {
  try {
    // Tìm người bị chặn
    const userToBlock = await User.findById(req.params.id);
    // Tìm người đang chặn
    const userBlocking = await User.findById(req.userAuth);

    if (!userToBlock || !userBlocking) {
      return next(appErr('User not found', 404));
    }

    // Kiểm tra đã chặn chưa
    const alreadyBlocked = userBlocking.blocked.find(
      blockedUser => blockedUser.toString() === userToBlock._id.toString()
    );

    if (alreadyBlocked) {
      return next(appErr('You have already blocked this user', 400));
    }

    // Thêm vào danh sách bị chặn
    userBlocking.blocked.push(userToBlock._id);
    await userBlocking.save();

    return res.json({
      status: 'success',
      data: 'You have successfully blocked this user',
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//unblock
const unblockUserCtrl = async (req, res, next) => {
  try {
    // Tìm người bị gỡ chặn
    const userToUnblock = await User.findById(req.params.id);
    // Tìm người đang gỡ chặn
    const userUnblocking = await User.findById(req.userAuth);

    if (!userToUnblock || !userUnblocking) {
      return next(appErr('User not found', 404));
    }

    // Kiểm tra xem người này có đang bị chặn không
    const isBlocked = userUnblocking.blocked.find(
      blockedUser => blockedUser.toString() === userToUnblock._id.toString()
    );

    if (!isBlocked) {
      return next(appErr('You have not blocked this user', 400));
    }

    // Gỡ chặn bằng cách filter ra khỏi danh sách
    userUnblocking.blocked = userUnblocking.blocked.filter(
      blockedUser => blockedUser.toString() !== userToUnblock._id.toString()
    );

    await userUnblocking.save();

    return res.json({
      status: 'success',
      data: 'You have successfully unblocked this user',
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//admin block user
const adminBlockUserCtrl = async (req, res, next) => {
  try {
    const usertobeBlocked = await User.findById(req.params.id);
    if (!usertobeBlocked) {
      return next(appErr('User not found', 404));
    }
    usertobeBlocked.isBlocked = true;
    await usertobeBlocked.save();

    res.json({
      status: 'success',
      data: 'You have successfully blocked this user',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};

// Admin unblock user
const adminUnblockUserCtrl = async (req, res, next) => {
  try {
    // Tìm người dùng cần được gỡ chặn
    const userToUnblock = await User.findById(req.params.id);

    if (!userToUnblock) {
      return next(appErr('User not found', 404));
    }

    // Cập nhật trạng thái chặn
    userToUnblock.isBlocked = false;
    await userToUnblock.save();

    return res.json({
      status: 'success',
      data: 'You have successfully unblocked this user',
    });
  } catch (error) {
    return res.json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete user
const deleteUserCtrl = async (req, res) => {
  try {
    
    res.json({
      status: 'success',
      data: 'User deteted route'
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};

// Update user
const updateUserCtrl = async (req, res) => {
  try {
    const userId = req.params.id;
    // Logic to update a user by ID
    res.json({
      status: 'success',
      data: 'update user route',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};

// Profile picture upload
const profilePictureUploadCtrl = async (req, res, next) => {
  console.log(req.file); // kiểm tra file có được nhận
  try {
    const usertoUpdate = await User.findById(req.userAuth);
    if (!usertoUpdate) {
      return next(appErr('User not found', 404));
    }
    if (usertoUpdate.isBlocked) {
      return next(appErr('Action not allowed, your account is blocked', 403));
    }
    if (req.file) {
      await User.findByIdAndUpdate(
        req.userAuth,
        { $set: { profilePhoto: req.file.path } },
        { new: true }
      );
      return res.json({
        status: 'success',
        data: 'Profile picture uploaded successfully'
      });
    } else {
      return next(appErr('No file uploaded', 400));
    }
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = {
    userRegisterCtrl,
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
};