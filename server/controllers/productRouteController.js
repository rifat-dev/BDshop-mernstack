const Product = require('../model/productModel')

// get all products -> '/api/products'
exports.getProducts = async(req, res, next) => {
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

// getSingleProducts -> '/api/products/:id'
exports.getSingleProduct = async(req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true,
            product
        })

    } catch (e) {
        next(e)
    }
}

// createProductReview -> '/api/products/create-review/:productId
exports.createProductReview = async(req, res, next) => {
    try {

        const { productId } = req.params
        console.log(req.body)

        // const product = await Product.findById(productId)

        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No Product Found'
        //     })
        // }

        // const review = {
        //     user: req.user._id,
        //     image: req.user.avatar.url,
        //     name: req.user.name,
        //     ratings: req.body.ratings,
        //     comments: req.body.comments
        // }

        // product.reviews.push(review)
        // await product.saive()

        res.status(200).json({
            success: true,
            message: 'review create success'
        })

    } catch (e) {
        next(e)
    }
}