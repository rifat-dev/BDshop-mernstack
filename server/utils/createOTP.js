const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const mailer = require("nodemailer");

const key = "verysecretkey";

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "mdr585643@gmail.com",
    pass: process.env.email_password,
  },
  tls: {
    rejectUnAuthorized: true,
  },
});

async function createNewOTP(email) {
  const otp = otpGenerator.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const ttl = 5 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;
  let isSend = await sendSMS(
    email,
    `Your OTP is ${otp} it will expire in 5 minutes`
  );
  return { fullHash, isSend };
}

const sendSMS = async (email, message) => {
  try {
    await transporter.sendMail({
      from: "Bd-shop <mdr585643@gmail.com>",
      to: email,
      subject: "OTP verification BD-Shop",
      text: message,
    });
    console.log("Email sent on " + new Date());
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
};

module.exports = createNewOTP;
