const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
      trim: true,
      maxLength: [100, "Product name cannot extcecd 100 char"],
    },
    summary: {
      type: String,
      required: [true, "please enter a short summary"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    additionalInformation: {
      type: String,
      trim: true,
    },
    costPrice: {
      // The price in which shop owner purchased
      type: Number,
      default: 0.0,
      required: true,
    },
    regularPrice: {
      // price the shop owner is saying the product’s price as general
      type: Number,
      default: 0.0,
      required: true,
    },
    price: {
      //The price in which shop owner is selling
      type: Number,
      required: [true, "please enter  price"],
      maxLength: [5, "Product price cannot extcecd 5 length"],
      default: 0.0,
    },
    discount: {
      isActive: {
        type: Boolean,
        default: false,
      },
      persent: {
        type: Number,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: Schema.ObjectId,
      required: true,
      ref: "Categories",
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: String,
      default: null,
      enum: {
        values: ["New", "Hot", "Best saller"],
      },
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
