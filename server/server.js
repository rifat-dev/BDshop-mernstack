const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

// env config setup
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "server/config/.env" });
}

// cloudinary config setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// database and server connect
const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PASS;
const url = `mongodb+srv://${dbName}:${dbPass}@cluster0.ltldm.mongodb.net/bdshop?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server Started on PORT ${port}`);
      console.log("Database Connect Success");
    });
  })
  .catch((e) => {
    return console.log(e);
  });
