const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  try {
    //fetch user details from req.body
    const { name, email, password, confirmPassword } = req.body; //object destructuring
    //check if password and confirm password matches or not

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password and confirmPassword does not match!",
        data: {},
      });
    }
    //check if user already exists or not
    const userDetails = await User.findOne({ email: email });
    if (userDetails) {
      return res.status(404).json({
        message: "user already exists!",
        data: {},
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //create user
    const newUser = await User.create({
      name: name,
      password: hashedPassword,
      email: email,
      confirmPassword: hashedPassword,
      blogs: [],
    });
    return res.status(200).json({
      message: "user successfully created!",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to create user",
      data: {
        error: error,
      },
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    //fetch user details from req.body object
    const { email, password } = req.body;

    //a.check if user exists or not via email
    const userDetails = await User.findOne({ email: email });
    console.log(userDetails);
    if (!userDetails) {
      return res.status(400).json({
        message: "please sign up",
        data: {},
      });
    }
    //a.(i)check if password matched or not with the found email user

    const isPasswordMatched = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "incorrect password/email",
        data: {},
      });
    }

    const token = jwt.sign(
      {
        email: userDetails.email,
      },
      "secret",
      { expiresIn: "1h" }
    );

    //if user exists and passowrd is correct sign in
    return res.status(200).json({
      message: "successfully signed in",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to sign in",
      data: {
        error: error,
      },
    });
  }
};

module.exports.getUserDetails = async (req, res) => {
  try {
    //fetch userID from req.params
    const { userId } = req.params;

    //fetch userDetails from user model using userID
    //fetch blog details from object id using populate
    //fetch username from object id using second degree populate(nested populate)

    const userDetails = await User.findById(userId).populate({
      path: "blogs",
      select: "content",
      populate: {
        path: "user",
        select: "name",
      },
    });

    console.log(userDetails, "userdetails");
    return res.status(200).json({
      message: "fetched user details successfully from the db",
      data: {
        userdetails: userDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "error fetching user details from the db",
      data: {
        error: error,
      },
    });
  }
};

module.exports.dashboard = async (req, res) => {
  try {
    console.log(req.user, "req");
    return res.status(200).json({
      message: "successfully signed in using google",
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      message: "error signing in to page",
      data: {
        error: error,
      },
    });
  }
};
