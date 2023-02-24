const express = require("express");
const port = 8000;
const database = require("./config/mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const passport_jwt = require("./config/passport-jwt");
const googleStrategy = require("./config/google-oauth");

const app = express();
app.use(express.urlencoded());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header(
    "Access-Control-Allow- headers",
    "Origin,X-Requested:With,Content-Type,Accept"
  );
  next();
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/index"));
console.log(process.env, "process");

app.listen(port, function (err) {
  if (err) console.log("error connecting to server");
  console.log("listening to port " + port);
});
