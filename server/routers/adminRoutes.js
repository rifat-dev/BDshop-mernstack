const router = require('express').Router()

const {
    newProduct,
    getAdminProducts,
    adminGetUsers,
    adminGetSingleUser,
    adminGetAllOrders,
    adminGetSingleOrder
} = require('../controllers/adminRouteController')

const { isAdmin, isAuthintecated } = require('../midlewares/authMidleware')

// admin products routes
router.get('/products', isAuthintecated, isAdmin('admin'), getAdminProducts)
router.post('/products/new', isAuthintecated, isAdmin('admin'), newProduct)

// admin user routes
router.get('/users', isAuthintecated, isAdmin('admin'), adminGetUsers)
router.get('/users/:id', isAuthintecated, isAdmin('admin'), adminGetSingleUser)

// admin products routes
router.get('/orders', isAuthintecated, isAdmin('admin'), adminGetAllOrders)
router.get('/orders/:id', isAuthintecated, isAdmin('admin'), adminGetSingleOrder)

module.exports = router