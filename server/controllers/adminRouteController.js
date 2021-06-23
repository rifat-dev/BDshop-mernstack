const Product = require('../model/productModel')
const User = require('../model/userModel')
const Order = require('../model/orderModel')
const clud = require('cloudinary').v2


//*** */
// admin users routs section
//**** */
// Get Users -> 'api/admin/users'
exports.adminGetUsers = async(req, res, nex) => {

    try {

        const users = await User.find()
        res.status(200).json({
            success: true,
            users
        })
    } catch (e) {
        next(e)
    }
}

exports.adminGetSingleUser = async(req, res, next) => {
    try {
        const { id } = req.params

        const { user } = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })


    } catch (e) {
        next(e)
    }
}

//*** */
// admin products routs section
//**** */
// productCreate -> 'api/admin/products/new'
exports.newProduct = async(req, res, next) => {
    try {

        // let images = []
        // if (typeof req.body.images === 'string') {
        //     images.push(req.body.images)
        // } else {
        //     images = req.body.images
        // }

        // let imgLinks = []
        // for (let i = 0; i < images.length; i++) {

        //     const result = await clud.uploader.upload(images[i], {
        //         folder: 'bdshop products'
        //     })

        //     imgLinks.push({
        //         publicId: result.public_id,
        //         url: result.secure_url
        //     })
        // }

        // req.body.images = imgLinks
        // req.body.user = req.user._id

        await Product.create(req.body)


        return res.status(200).json({
            success: true,
            message: 'Product create successfully',
            // product
        })


    } catch (e) {
        next(e)
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}


// getAdminProducts -> 'api/admin/products'
exports.getAdminProducts = async(req, res, next) => {
    try {
        const products = await Product.find()

        res.status(200).json({
            success: true,
            products
        })
    } catch (e) {
        next(e)
    }
}


//*** */
// admin orders routs section
//**** */
exports.adminGetAllOrders = async(req, res, next) => {

    try {
        const orders = await Order.find()

        let totalAmount = 0;
        orders.forEach(element => {
            totalAmount = element.totalPrice + totalAmount
        });

        res.status(200).json({
            success: true,
            orders,
            totalAmount
        })

    } catch (e) {
        next(e)
    }
}

exports.adminGetSingleOrder = async(req, res, next) => {

    try {
        const { id } = req.params
        const { order } = await Order.findById(id)


        if (!order) {
            return res.status(404).json({
                success: false,
                message: "There Is No Order Found"
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