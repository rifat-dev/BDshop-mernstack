const crypto = require("crypto");
const key = "verysecretkey";

function verifyOTP(email, hash, otp) {
  let [hashValue, expires] = hash.split(".");

  let now = Date.now();
  if (now > parseInt(expires)) return false;

  let data = `${email}.${otp}.${expires}`;
  let newCalculatedHash = crypto
    .createHmac("sha256", key)
    .update(data)
    .digest("hex");

  if (newCalculatedHash === hashValue) {
    return true;
  }
  return false;
}

module.exports = verifyOTP;
