const router = require('express').Router()

const {
    newProduct,
    getAdminProducts
} = require('../controllers/adminRouteController')

const { isAdmin, isAuthintecated } = require('../midlewares/authMidleware')

// admin products routes
router.get('/products', isAuthintecated, isAdmin('admin'), getAdminProducts)
router.post('/products/new', isAuthintecated, isAdmin('admin'), newProduct)

module.exports = router