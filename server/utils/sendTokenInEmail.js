const mailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "mdr585643@gmail.com",
    pass: process.env.email_password, //process.env.email_password
  },
  tls: {
    rejectUnAuthorized: true,
  },
});

// https://bdshop-ecommarce.herokuapp.com
// http://localhost:3000

exports.sendEmail = async (email) => {
  try {
    const token = jwt.sign(
      {
        email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    await transporter.sendMail({
      from: "Bd-shop <mdr585643@gmail.com>",
      to: email,
      subject: "Email verification",
      html: `
      Go to this url for verify your email address.
      <br />
      <a href="https://bdshop-ecommarce.herokuapp.com/verify/${token}">
          https://bdshop-ecommarce.herokuapp.com/verify/${token}
      </a>
      
      `,
    });
    console.log("Email sent on " + new Date());
  } catch (error) {
    console.log(error);
  }
};
