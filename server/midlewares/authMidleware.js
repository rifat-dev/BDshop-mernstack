const jwt = require('jsonwebtoken')
const User = require('../model/userModel')


exports.isAuthintecated = async(req, res, next) => {

    try {

        const { token } = req.signedCookies;

        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'Please login first'
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await User.findById(decoded._id)
        next()

    } catch (e) {
        next(e)
    }
}

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roal)) {
            return res.status(403).json({
                success: false,
                message: 'Please login first to access this route'
            })
        }
        next()
    }
}