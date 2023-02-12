const mongoose = require("mongoose");
const server = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

// socket io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
global.io = io;

// env config setup
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "server/config/.env" });
}

// socket io connection
io.on("connection", (socket) => {
  console.log("Connected to client");

  socket.on("message", (message) => {
    console.log("Message received:", message);
    io.emit("message", message);
  });
});

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
    server.listen(port, () => {
      console.log(`Server Started on PORT ${port}`);
      console.log("Database Connect Success");
    });
  })
  .catch((e) => {
    return console.log(e);
  });
