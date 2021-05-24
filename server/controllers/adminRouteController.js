const Product = require('../model/productModel')

const clud = require('cloudinary').v2




//*** */
// admin products routs section
//**** */
// productCreate -> 'api/admin/product/new'
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
        req.body.user = req.user._id

        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Product create successfully',
            product
        })


    } catch (e) {
        next(e)
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