const router = require('express').Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userRouteController')

const { isAuthintecated } = require('../midlewares/authMidleware')
    //login , signup, logout
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

//  isAuthintecated user routes
router.get('/me', isAuthintecated, getUser);
router.put('/update/profile', isAuthintecated, updateUser)
router.put('/update/password', isAuthintecated, updateUserPassword)
module.exports = router