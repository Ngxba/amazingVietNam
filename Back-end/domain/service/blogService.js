var Blog = require("../models/blog");

const BlogService = {
  createBlog: async (place, placeId, description, title, essay) => {
    const result = await Blog.findOne({ placeId });
    if (!result) {
      const newBlog = Blog({
        place, placeId, description, title, essay
      });
      await newBlog.save();
      return newBlog;
    } else {
      throw new Error("BLOG_EXISTED");
    }
  },
  getBlog: async (placeId) => {
    let result = await Blog.findOne({ placeId });
    if (result) {
      return result;
    } else {
      throw new Error("error/Blog_not_found");
    }
  },
  editBlog: async (place, placeId, description, title, essay) => {
    let result = await Blog.findOne({ placeId });
    if (result) {
      result.place = place;
      result.title = title;
      result.essay = essay;
      result.description = description;
      result.save();
      return result
    } else {
      throw new Error("error/Blog_not_found");
    }
  },
  submitFeedback: async (placeId, userFeedback) => {
    let result = await Blog.findOne({ placeId });
    if (result) {
      result.userFeedback.push(userFeedback)
      result.save();
      return result
    } else {
      throw new Error("error/Can't not submit feedback");
    }
  },
}

module.exports = BlogService;