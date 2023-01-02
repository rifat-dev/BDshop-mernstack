let nodemailer = require("nodemailer");
let handlebars = require("handlebars");
let fs = require("fs");
const path = require("path");
let file = "../template/forgetPass.html";

const readHtmlFile = (path, callback) => {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const SendEmailUtility = async (EmailTo, otp, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: "mdr585643@gmail.com",
      pass: process.env.email_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let templatePath = path.join(__dirname, file);

  await readHtmlFile(templatePath, function (err, html) {
    if (err) {
      console.log("error reading file", err);
      return;
    }

    // create template
    let template = handlebars.compile(html);
    let replacements = {
      userotpcode: `${otp}`,
    };

    let htmlTemplate = template(replacements);
    let mailOptions = {
      from: "BDShop <mdr585643@gmail.com>",
      to: EmailTo,
      subject: EmailSubject,
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        return result;
      }
    });
  });
};
module.exports = SendEmailUtility;
