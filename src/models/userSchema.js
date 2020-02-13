const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "User"
    },
    
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose)


const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel;