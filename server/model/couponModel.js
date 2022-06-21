const { model, Schema } = require("mongoose");

const couponSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: ["Percentage", "Fixed amount"],
      },
    },
    discountValue: {
      type: Number,
      required: true,
    },
    usageLimit: {
      type: Number,
    },
    status: {
      type: String,
      default: "Enabled",
      enum: {
        values: ["Enabled", "Disabled"],
      },
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Coupon = model("Coupon", couponSchema);

module.exports = Coupon;
