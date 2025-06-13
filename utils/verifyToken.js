const jwt = require('jsonwebtoken');
const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return false; // Token is invalid
        }
        return decoded; // Token is valid, return decoded payload
    });
};

module.exports = verifyToken;