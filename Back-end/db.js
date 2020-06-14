require("dotenv").config();
var mongoose = require("mongoose");
const db = {
    // url : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    url : `mongodb+srv://admin:admin@cluster0-qvxth.mongodb.net/Project1?retryWrites=true&w=majority`,
    option : {
        useNewUrlParser : true // de sp mongo cho su dung db cua no
    }
}

mongoose.connect(db.url, db.option);

module.exports = mongoose;

