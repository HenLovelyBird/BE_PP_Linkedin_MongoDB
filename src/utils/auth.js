const basicAuth = require("express-basic-auth")
const User = require("../models/userAuthSchema.js")
const atob = require("atob")

checkInMongoose = async (username, password, cb) => {
    const authResult = await User.authenticate()(username, password)
    return cb(null, authResult.user)
}

module.exports = {
    basic: basicAuth({
        authorizer: checkInMongoose,
        authorizeAsync: true,
    }),
    setUserInfo: async (req, res, next) =>{
        const username = atob(req.headers.authorization.split(" ")[1]).split(":")[0]
        req.user = await User.findOne({ username: username});
        next()
    },
    adminOnly: async (req, res, next) =>{
        const username = atob(req.headers.authorization.split(" ")[1]).split(":")[0]
        const user = await User.findOne({ username: username})
        if (user.role === "admin")
            next()
        else 
            res.status(401).send("Only for admins")
    }
}