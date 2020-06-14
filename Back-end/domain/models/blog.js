const mongoose = require("../../db.js");
var Schema = mongoose.Schema;

var blog = new Schema({
  place: String,
  placeId : String,
  description: String,
  title: String,
  essay: Array,
  userFeedback : Array
});

const Blog = mongoose.model("blog", blog);

module.exports = Blog;