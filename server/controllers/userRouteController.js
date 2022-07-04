const stripe = require("stripe")(
  "sk_test_51LH6jeCiKvgC8IeKZfFnnm5sXzWTc8pmcATiUxUii2I2X9gic1Nh91JE99Hj2UBRA9BEWrG3SAptc4B74Pw8UcFN00ZaCxD6IQ"
);
const User = require("../model/userModel");
const Address = require("../model/userAddressModel");
const Coupon = require("../model/couponModel");
const clud = require("cloudinary").v2;
const bcrypt = require("bcrypt");

const createOTP = require("../utils/createOTP");
const verifyOTP = require("../utils/verifyOTP");
const sendToken = require("../utils/sendToken");

// register user -> '/api/user/register'
exports.registerUser = async (req, res, next) => {
  // console.log(req.body)
  try {
    const { name, email, password } = req.body;

    if (!req.body.avatar) {
      return res.status(400).json({
        success: false,
        message: "Please  give your profile picture",
      });
    }
    const result = await clud.uploader.upload(req.body.avatar, {
      folder: "bdshop-avatars",
    });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provied your email or password",
      });
    }

    const hashPass = await bcrypt.hash(password, 11);

    const user = await User.create({
      name,
      email,
      password: hashPass,
      avatar: {
        publicId: result.public_id,
        url: result.secure_url,
      },
    });

    sendToken(user, 200, res);
  } catch (e) {
    next(e);
  }
};

// login user -> '/api/user/login'
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your email or password is not correct",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Your email or password is not correct",
      });
    }

    sendToken(user, 200, res);
  } catch (e) {
    next(e);
  }
};

// getUser user -> '/api/user/me'
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      "-password"
    );
    sendToken(user, 200, res);
  } catch (e) {
    next(e);
  }
};

// updateUser user -> '/api/user/update/profile'
exports.updateUser = async (req, res, next) => {
  try {
    // if (req.body.avatar) {
    //   await clud.uploader.destroy(user.avatar.publicId);
    //   const result = await clud.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //   });

    //   let avatar = {
    //     publicId: result.public_id,
    //     url: result.secure_url,
    //   };
    //   user.avatar = avatar;
    // }

    let updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

// updateUserPassword user -> '/api/user/update/password'
exports.updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;
    let user = req.user;
    const match = await bcrypt.compare(oldPassword, req.user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Your old password is incorrect",
      });
    }

    const hashPass = await bcrypt.hash(password, 11);

    user.password = hashPass;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password update successfully",
    });
  } catch (e) {
    next(e);
  }
};

// logout user -> '/api/user/logout'
exports.logoutUser = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User LogOut success",
  });
};

// user addresses.

exports.createBillingAddress = async (req, res, next) => {
  try {
    let address = [];
    address = await Address.findOne({
      $and: [{ user: req.user._id }, { addressType: "Billing" }],
    });

    if (!address) {
      req.body.user = req.user._id;
      address = await Address.create(req.body);
    } else {
      address = await Address.findOneAndUpdate(
        { $and: [{ user: req.user._id }, { addressType: "Billing" }] },
        req.body,
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      address: address,
    });
  } catch (e) {
    next(e);
  }
};

exports.createShippingAddress = async (req, res, next) => {
  try {
    let address = [];
    address = await Address.findOne({
      $and: [{ user: req.user._id }, { addressType: "Shipping" }],
    });

    if (!address) {
      req.body.user = req.user._id;
      address = await Address.create(req.body);
    } else {
      address = await Address.findOneAndUpdate(
        { $and: [{ user: req.user._id }, { addressType: "Shipping" }] },
        req.body,
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      address: address,
    });
  } catch (e) {
    next(e);
  }
};

exports.getAddresses = async (req, res, next) => {
  try {
    let addresses = await Address.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (e) {
    next(e);
  }
};

// user coupon
exports.getValidCoupon = async (req, res, next) => {
  try {
    console.log(req.params);
    const coupon = await Coupon.aggregate([
      {
        $match: {
          code: req.params.couponCode,
          usageLimit: {
            $gte: 0,
          },
          status: "Enabled",
          startDate: {
            $lt: new Date(new Date().setHours(00, 00, 00)),
          },
          endDate: {
            $gte: new Date(new Date().setHours(00, 00, 00)),
          },
        },
      },
    ]);
    // console.log(coupon);
    res.status(200).json({ success: true, coupon });
  } catch (e) {
    console.log(`Coupon error: ${e.message}`);
    next(e);
  }
};

exports.sendUserOTP = async (req, res, next) => {
  let { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your email is not correct",
      });
    }

    const { fullHash, isSend } = await createOTP(email);
    if (!isSend) {
      return res.status(504).json({
        success: false,
        message: "OTP send fail",
      });
    }
    res.status(200).send({ hash: fullHash, email });
  } catch (e) {
    next(e);
  }
};

exports.verifyUserOTP = async (req, res, next) => {
  let { email, hash, otp } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const isVerified = verifyOTP(email, hash, otp);

    if (!isVerified) {
      return res.status(504).json({
        verification: false,
        message: "Please try again",
      });
    }

    sendToken(user, 200, res);
  } catch (e) {
    next(e);
  }
};
