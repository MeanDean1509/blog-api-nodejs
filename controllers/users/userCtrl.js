const bcrypt = require('bcryptjs');
const User = require('../../model/User/User'); 
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');

//Rerister
const userRegisterCtrl = async (req, res)=> {
  const {firstname, lastname, profilePhoto, email, password } = req.body;
  try {

    // Logic to create a user
    // Check email existence
    const userFound = await User.findOne({ email });
    if(userFound) {
      return res.json({
        msg: 'Email already exists',
      });
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
      res.json({
        status: 'error',
        message: error.message
      });
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

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userProfileCtrl,
    UsersCtrl,
    deleteUserCtrl,
    updateUserCtrl,
};