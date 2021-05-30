const Product = require('../model/productModel')

// get all products -> 'api/products'
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

// getSingleProducts -> 'api/products/:id'
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