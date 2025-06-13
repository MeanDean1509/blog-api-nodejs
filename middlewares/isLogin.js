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
        return res.json({
            message:"Invalid token, please login again",
        });
    } else{
        next();
    }
    
};


module.exports = isLogin;
