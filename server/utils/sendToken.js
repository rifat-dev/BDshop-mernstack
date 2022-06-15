const jwt = require("jsonwebtoken");
const sendToken = (user, code, res) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      roal: user.roal,
      createdAt: user.createdAt,
    },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );

  let options = {
    maxAge: 1000 * 60 * 60, // would expire after 60 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
  };

  delete user.password;
  res.status(code).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
