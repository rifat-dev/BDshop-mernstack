const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provied your name"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      require: [true, "Please provied your email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provied your password"],
      min: [8, "Your password length must be 8"],
    },
    mobile: {
      type: String,
    },
    user_otp: {
      type: String,
    },
    avatar: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
    },
    roal: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Active",
      enum: {
        values: ["Active", "Inactive"],
      },
    },
    wishlist: [
      {
        type: Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
