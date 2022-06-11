const { model, Schema } = require("mongoose");

const addressSchema = new Schema(
  {
    userId: {
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
    address: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Address = model("Address", addressSchema);
modul.exports = Address;
