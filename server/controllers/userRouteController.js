const User = require("../model/userModel");
const Address = require("../model/userAddressModel");
const clud = require("cloudinary").v2;
const bcrypt = require("bcrypt");

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

exports.createAddress = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const address = await Address(req.body);
    address.save();

    console.log(address);

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
