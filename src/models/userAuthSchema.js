const mongoose = require ('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")

const userAuthSchema = new mongoose.Schema({
        role: {
            type: String,
            required: true
        },
        firstName: String,
        surName: String,
        email: String     
})

userAuthSchema.plugin(passportLocalMongoose) 

module.exports = mongoose.model("UserTestBasicAuth", userAuthSchema)