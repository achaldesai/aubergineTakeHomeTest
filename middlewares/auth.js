const jwt = require('jsonwebtoken');
const User = require('../DBSchemas/userSchema');

let authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            });
        }

        //remove Bearer from token
        token = token.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

let createToken = async (user) => {
    const result = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return result;
}

module.exports = {authMiddleware, createToken};