const mongoose = require("../../db.js");
var Schema = mongoose.Schema;

var places = new Schema({
  city: String,
  region: String,
  name: String,
  description: String,
});

const Places = mongoose.model("places", places);

module.exports = Places;
