const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

//think of this as only for auth
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        required: true,
        default: "User"
    }
})

userSchema.plugin(passportLocalMongoose)


const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel;