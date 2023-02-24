const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGODB_URL, "env");
//connect to ur db in mongodb
mongoose.connect(process.env.MONGODB_URL, {
  dbName: "Blogs-project",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//get the connection to the db
const db = mongoose.connection;

//error
db.on("error", function (err) {
  console.log(err.message);
});

//successful connection
db.once("open", function () {
  console.log("connected to db");
});
