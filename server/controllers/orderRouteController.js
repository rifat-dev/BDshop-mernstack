const Order = require("../model/orderModel");
const Coupon = require("../model/couponModel");
const Product = require("../model/productModel");
const stripe = require("stripe")(
  "sk_test_51LH6jeCiKvgC8IeKZfFnnm5sXzWTc8pmcATiUxUii2I2X9gic1Nh91JE99Hj2UBRA9BEWrG3SAptc4B74Pw8UcFN00ZaCxD6IQ"
);

// create user order => '/api/order/new'
exports.newOrder = async (req, res, next) => {
  const {
    token,
    items,
    shippingInfo,
    coupon,
    subtotal,
    shipping,
    discount,
    totalAmount,
  } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        customer: customer.id,
        amount: req.body.totalAmount,
        currency: "usd",
        receipt_email: token.email,
      },
      {
        idempotencyKey: ` ${Math.floor(
          Math.random() * 100000
        )}-payment- ${new Date()}`,
      }
    );

    if (payment) {
      const order = await Order.create({
        user: req.user._id,
        items,
        shippingInfo,
        paymentInfo: {
          transactionId: payment.source.id,
          paid: true,
          paidAt: new Date(),
        },
        subtotal,
        shipping,
        discount,
        total: totalAmount,
      });

      if (Object.keys(coupon).length !== 0) {
        await Coupon.findByIdAndUpdate(
          { _id: coupon._id },
          {
            usageLimit: coupon.usageLimit - 1,
          },
          {
            new: true,
          }
        );
      }

      for (const item of items) {
        await Product.findByIdAndUpdate(
          { _id: item._id },
          {
            stock: item.stock - item.quantity,
          },
          { new: true }
        );
      }
      res.status(200).json({
        success: true,
        order,
      });
    } else {
      return res.status(404).json({
        message: "Payment failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

// getUserOrders order => '/api/order/my'
exports.getMyorders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (e) {
    next(e);
  }
};

// getSingleOrder order => '/api/order/:id'
exports.getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
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
