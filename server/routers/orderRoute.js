const router = require('express').Router()

const {
    newOrder,
    getMyorders,
    getSingleOrder
} = require('../controllers/orderRouteController')

const { isAuthintecated } = require('../midlewares/authMidleware')

router.post('/new', isAuthintecated, newOrder)
router.get('/my', isAuthintecated, getMyorders)
router.get('/:id', isAuthintecated, getSingleOrder)

module.exports = router