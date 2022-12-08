const bcrypt = require("bcrypt");
const OTP = require("../model/OTP");
const User = require("../model/userModel");

const SendEmailUtility = require("../utility/SendEmailUtility");

exports.RecoverVerifyEmail = async (req, res) => {
  let email = req.params.email;
  let OTPCode = Math.floor(100000 + Math.random() * 900000);
  try {
    // Email Account Query
    let UserCount = await User.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    if (UserCount.length > 0) {
      // OTP Insert
      let CreateOTP = await OTP.create({ email: email, otp: OTPCode });
      // Email Send
      let SendEmail = await SendEmailUtility(
        email,
        "Your PIN Code is= " + OTPCode,
        "Task Manager PIN Verification"
      );
      res.status(200).json({ status: "success", data: SendEmail });
    } else {
      res.status(200).json({ status: "fail", data: "No User Found" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

exports.RecoverVerifyOTP = async (req, res) => {
  let email = req.params.email;
  let OTPCode = req.params.otp;
  let status = 0;
  let statusUpdate = 1;
  try {
    let OTPCount = await OTP.aggregate([
      { $match: { email: email, otp: OTPCode, status: status } },
      { $count: "total" },
    ]);
    if (OTPCount.length > 0) {
      let OTPUpdate = await OTP.updateOne(
        { email: email, otp: OTPCode, status: status },
        {
          email: email,
          otp: OTPCode,
          status: statusUpdate,
        }
      );

      res.status(200).json({ status: "success", data: OTPUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP Code" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

exports.RecoverResetPass = async (req, res) => {
  let email = req.body["email"];
  let OTPCode = req.body["OTP"];
  let NewPass = req.body["password"];
  let statusUpdate = 1;

  try {
    let OTPUsedCount = await OTP.aggregate([
      { $match: { email: email, otp: OTPCode, status: statusUpdate } },
      { $count: "total" },
    ]);
    if (OTPUsedCount.length > 0) {
      const hashPass = await bcrypt.hash(NewPass, 11);
      let PassUpdate = await User.updateOne(
        { email: email },
        {
          password: hashPass,
        }
      );
      await OTP.deleteOne({ email: email, otp: OTPCode, status: statusUpdate });
      res.status(200).json({ status: "success", data: PassUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid Request" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
