const express = require("express")

const profileRouter = express.Router()

const {objectId} = require ("mongodb")

const Profiles = require("../../models/profileSchema")



profileRouter.get("/", async (req,res)=>{
    const profiles = await Profiles.find()

    res.send(profiles)
})















module.exports = profileRouter;