const Product = require("../model/productModel");
const User = require("../model/userModel");
const Order = require("../model/orderModel");
const Coupon = require("../model/couponModel");
const clud = require("cloudinary").v2;

//*** */
// admin users routs section
//**** */
// Get Users -> 'api/admin/users'
exports.adminGetUsers = async (req, res, nex) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    next(e);
  }
};

exports.adminGetSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { user } = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    next(e);
  }
};

//*** */
// admin products routs section
//**** */
// productCreate -> 'api/admin/products/new'
exports.newProduct = async (req, res, next) => {
  try {
    const images = [...JSON.parse(req.body.images)];
    let savedImages = [];
    for (const image of images) {
      let result = await clud.uploader.upload(image, {
        folder: "bdshop products",
      });

      savedImages.push({
        publicId: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = savedImages;
    req.body.user = req.user._id;
    const product = await Product.create(req.body);

    // console.log(product);
    res.status(200).json({
      success: true,
      message: "Product create successfully",
      product,
    });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

// getAdminProducts -> 'api/admin/products'
exports.getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      select: "name",
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateAdminProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    let product = await Product.findById(productId);

    if (!product) {
      return res.status(403).json({
        success: false,
        message: "Product Not Found",
      });
    }

    let updateProduct = {};
    if (req.body.price) {
      updateProduct.price = req.body.price;
    }
    if (req.body.stock) {
      updateProduct.stock = product.stock + req.body.stock;
    }

    product = await Product.findByIdAndUpdate(productId, updateProduct, {
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Product Update Success",
      updateProductId: product._id,
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteAdminProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(403).json({
        success: false,
        message: "Product Not Found",
      });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      success: true,
      message: "Product Delete Success",
    });
  } catch (e) {
    next(e);
  }
};

//*** */
// admin orders routs section
//**** */
exports.adminGetAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((element) => {
      totalAmount = element.totalPrice + totalAmount;
    });

    res.status(200).json({
      success: true,
      orders,
      totalAmount,
    });
  } catch (e) {
    next(e);
  }
};

exports.adminGetSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order } = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "There Is No Order Found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateAdminOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    // console.log(req.body)

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }

    await Order.findByIdAndUpdate(orderId, req.body, {
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Order update success",
    });
  } catch (e) {
    next(e);
  }
};

//*** */
// admin coupon routs controllers section
//**** */

exports.createCoupon = async (req, res, next) => {
  try {
    req.body.discountValue = Number(req.body.discountValue);
    req.body.usageLimit = Number(req.body.usageLimit);
    // console.log(req.body);
    let coupon = await Coupon.create(req.body);
    return res.status(201).json({
      success: true,
      coupon,
    });
  } catch (e) {
    console.log(`create coupon error : ${e.message}`);
    next(e);
  }
};

exports.getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find();
    console.log(coupons);
    return res.status(200).json({
      success: true,
      coupons,
    });
  } catch (e) {
    console.log(`getAllCoupons error : ${e.message}`);
    next(e);
  }
};
