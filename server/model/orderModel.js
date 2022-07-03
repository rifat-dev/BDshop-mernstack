const { model, Schema } = require("mongoose");

const orderSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    paymentInfo: {
      transactionId: {
        type: String,
      },
      paid: {
        type: Boolean,
        default: false,
      },
      paidAt: {
        type: Date,
      },
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    total: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Received",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
