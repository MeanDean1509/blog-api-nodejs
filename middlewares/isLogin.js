const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");


const isLogin = (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    // verify token
    const decodedUser = verifyToken(token);
    //save user in req
    req.userAuth = decodedUser.id;
    if (!decodedUser) {
        return next(appErr("Invalid or expired token", 500));
    } else{
        next();
    }
    
};


module.exports = isLogin;
