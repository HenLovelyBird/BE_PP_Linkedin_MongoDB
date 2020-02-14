const LocalStrategy = require("passport-local") // strategy to verify username and password
const passport = require("passport")
const User = require("../models/userSchema")
const Profile = require('../models/profileSchema')

//token stuff:
const jwt = require("jsonwebtoken")
const JwtStrategy = require("passport-jwt").Strategy // strategy to verify the access token
const ExtractJwt = require("passport-jwt").ExtractJwt // this is a helper to extract the info from the token

const dotenv = require("dotenv")
dotenv.config()

//1) We need to specify to passport how we are gonna handle serialization and deserialization of the UserModel
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new LocalStrategy(User.authenticate())) // this strategy will be used when we ask passport 
// to passport.authenticate("local")

//-----------------JWT AREA-------------------------------------
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Authorization: Bearer TOKEN
    secretOrKey: process.env.TOKEN_PASSWORD //
}

passport.use(new JwtStrategy
    (jwtOptions, 
            (jwtPayload, callback) =>{ //this strategy will be used when we ask passport to passport.authenticate("jwt")
            User.findById(jwtPayload._id, (err, user) => { //looks into the collection
            if (err) return callback(err, false) // ==> Something went wrong getting the info from the db
            else if (user) return callback(null, user) // ==> Existing user, all right!
            else return callback(null, false) // ==> Non existing user
    })
}))

passport.use(new JwtStrategy
    (jwtOptions, 
            (jwtPayload, callback) =>{ //this strategy will be used when we ask passport to passport.authenticate("jwt")
            Profile.findById(jwtPayload._id, (err, user) => { //looks into the collection
            if (err) return callback(err, false) // ==> Something went wrong getting the info from the db
            else if (user) return callback(null, user) // ==> Existing user, all right!
            else return callback(null, false) // ==> Non existing user
    })
}))

//-----------------JWT AREA-------------------------------------

module.exports = {
    getToken: (user) => jwt.sign(profile, user, jwtOptions.secretOrKey, { expiresIn: 1000 }) 
    //this is just a helper to have a central point for token generation
}