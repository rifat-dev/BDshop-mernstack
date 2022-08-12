const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUploder = require("express-fileupload");
const path = require("path");
// app setup
const app = express();

// bodyParser setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // middleware setup
const middleware = [
  cors(),
  morgan("dev"),
  cookieParser("SECRET"),
  fileUploder(),
];
app.use(middleware);

// import all routers
const user = require("./routers/userRoutes");
const admin = require("./routers/adminRoutes");
const category = require("./routers/categoryRoutes");
const product = require("./routers/productRoutes");
const order = require("./routers/orderRoute");

// import midlewares
const errorHandler = require("./midlewares/error-handeler.midleware");

// use all routers
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/products", product);
app.use("/api/order", order);
app.use("/api/admin", admin);

// error handling
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

// exports app for listen server
module.exports = app;
