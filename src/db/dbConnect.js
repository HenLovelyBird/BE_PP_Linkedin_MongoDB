const config = require("../config/config");
const mongoose = require("mongoose");
const uri = config.db.uri;

console.log("DB Base URI >> ", uri);

mongoose
    .connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then( () => console.log("MongoDB Connected"))
    .catch(err => console.log("ERROR connecting to MongoDb", err));

module.exports = mongoose;
