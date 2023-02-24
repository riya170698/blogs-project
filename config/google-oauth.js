const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
require("dotenv").config();

passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/success",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile, "profile");
      try {
        //find a user
        const user = await User.findOne({ email: profile.emails[0].value });
        //user exists

        if (user) return done(null, user);
        //user not found
        else {
          //create a new user
          const newUser = User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
              confirmPassword: crypto.randomBytes(20).toString("hex"),
              blogs: [],
            },
            function (err, newUser) {
              if (err) console.log("error creating a new user");
              else {
                console.log("successfully created a new user");
                return done(null, newUser);
              }
            }
          );
        }
      } catch (err) {
        console.log(err, "error");
        return done(err, false);
      }
    }
  )
);
