const Blog = require("../models/blog");
const User = require("../models/user");

module.exports.createBlog = async (req, res) => {
  try {
    console.log(req.body, "req");
    //fetch blog content and user id from req.body object

    const { content, userId } = req.body;

    //create the blog in blog model
    const blog = await Blog.create({
      content,
      user: userId,
    });
    console.log(blog, "blog");
    //find the user in usermodel via user id in req.body
    const blogUser = await User.findById(userId);

    //push the blog object inside the blogs array
    blogUser.blogs.push(blog._id);

    //save the updated user model
    await blogUser.save();

    //send successful res status 200
    return res.status(200).json({
      message: "blog created successfully",
      data: {
        blog,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to create blog",
      data: {
        error: error,
      },
    });
  }
};

module.exports.getAllBlogs = async (req, res) => {
  try {
    // get all the blogs present inside Blog model
    const blogs = await Blog.find({}).populate({
      path: "user",
      select: "name",
    });
    console.log(blogs, "blogs");
    return res.status(200).json({
      message: "successfully fetched the blogs from the db",
      data: {
        blogs: blogs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "error fetching the blogs from the db",
      data: {
        error: error,
      },
    });
  }
};
