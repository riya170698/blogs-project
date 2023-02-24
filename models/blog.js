const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //createdAt:
    //updatedAt
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
