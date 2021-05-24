const router = require('express').Router()

const {
    getProducts,
    getSingleProduct
} = require('../controllers/productRouteController')


router.get('/', getProducts)
router.get('/:id', getSingleProduct)


module.exports = router