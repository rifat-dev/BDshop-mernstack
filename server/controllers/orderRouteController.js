const Order = require('../model/orderModel')



// create user order => '/api/order/new'
exports.newOrder = async(req, res, next) => {
    try {


        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
        } = req.body;

        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            deliveredAt: Date.now(),
            paidAt: Date.now(),
            user: req.user._id
        })

        res.status(200).json({
            success: true,
            order
        })


    } catch (e) {
        next(e)
    }
}

// getUserOrders order => '/api/order/my'
exports.getMyorders = async(req, res, next) => {
    try {

        const orders = await Order.find({ user: req.user._id })

        res.status(200).json({
            success: true,
            orders
        })

    } catch (e) {
        next(e)
    }
}


// getSingleOrder order => '/api/order/:id'
exports.getSingleOrder = async(req, res, next) => {
    try {

        const { id } = req.params

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        res.status(200).json({
            success: true,
            order
        })



    } catch (e) {
        next(e)
    }
}