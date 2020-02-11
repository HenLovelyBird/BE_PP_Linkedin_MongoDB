const mongoose = require ('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
        role: {
            type: String,
            required: true
        },
        firstName: String,
        surName: String,
        email: String
      
})

userSchema.plugin(passportLocalMongoose) 

module.exports = mongoose.model("UserTestBasicAuth", userSchema)