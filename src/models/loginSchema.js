const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const loginSchema = new mongoose.Schema({
    user:  {
        username: String,
        password: String,
        type: String,
        unique:true
      }
  });

  User.plugin(passportLocalMongoose);
  export default loginSchema;