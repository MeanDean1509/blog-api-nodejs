const User = require("../model/User/User");

const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    // verify token
    const decodedUser = verifyToken(token);
    //save user in req
    req.userAuth = decodedUser.id;
    // Find th user in the database
    const user = await User.findById(decodedUser.id);
    // Check if the user is an admin
    if (user.isAdmin){
        return next();

    } else {
        return next(appErr("Access Denied, Admin only", 403));
    }
    
};

module.exports = isAdmin;
