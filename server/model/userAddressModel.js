const { model, Schema } = require("mongoose");

const addressSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    addressType: {
      type: String,
      required: true,
      enum: {
        values: ["Shipping", "Billing"],
      },
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Address = model("Address", addressSchema);
module.exports = Address;
