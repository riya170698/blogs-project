const express = require("express");
const router = express.Router();

const passport = require("passport");
const studentController = require("../controllers/studentController");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
router.get("/", studentController.home);

router.post("/add-student", studentController.addStudent);
router.get("/delete-student/:email", studentController.deleteStudent);

router.get("/users", studentController.userPage);
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post(
  "/create-blog",
  passport.authenticate("jwt", { session: false }),
  blogController.createBlog
);
router.get(
  "/blogs",
  passport.authenticate("jwt", { session: false }),
  blogController.getAllBlogs
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.getUserDetails
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/success",
  passport.authenticate("google", { failure: "/sign-up", session: false }),
  userController.dashboard
);

module.exports = router;
