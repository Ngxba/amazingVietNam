const mongoose = require("../../db.js");
var Schema = mongoose.Schema;

var destination = new Schema({
  region: String,
  city: String,
  description: String,
});

const Destination = mongoose.model("destination", destination);

module.exports = Destination;