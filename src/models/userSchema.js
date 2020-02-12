const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    role: String
})

userSchema.plugin(passportLocalMongoose)

const collectionName = "users"
const UserModel = mongoose.model(collectionName, userSchema)
module.exports = UserModel;