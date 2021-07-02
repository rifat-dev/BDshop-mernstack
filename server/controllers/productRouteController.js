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

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'No Product Found'
            })
        }

        const review = {
            user: req.user._id,
            image: req.user.avatar.url,
            name: req.user.name,
            ratings: Number(req.body.ratings),
            comments: req.body.comment
        }

        const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if (isReviewed) {
            product.reviews.forEach(review => {
                    if (review.user.toString() === req.user._id.toString()) {
                        review.comments = req.body.comment;
                        review.ratings = Number(req.body.ratings);
                    }
                })
                // product.numOfReviews = product.reviews.length

        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        }

        product.ratings = product.reviews.reduce((acc, item) => item.ratings + acc, 0) / product.reviews.length
        await product.save()

        res.status(200).json({
            success: true,
            message: 'review create success'
        })

    } catch (e) {
        next(e)
    }
}