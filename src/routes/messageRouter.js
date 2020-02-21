const express = require("express")
const Message = require("../models/msgSchema")
const passport = require("passport")

const messageRouter = express.Router()

messageRouter.get("/", passport.authenticate("jwt"), async (req, res) => {
    res.send(await Message.find({ $or: [{ to: req.user.username}, {from: req.user.username}]}))
})

module.exports = messageRouter