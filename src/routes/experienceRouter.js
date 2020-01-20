const express = require("express")
const fs = require("fs-extra")
const {} = require('express-validator')
const multer = require("multer")
const multerConfig = multer()
const Experience = require("../../models/experienceSchema")

const experienceRouter = express.Router();

experienceRouter.get("/", async(req, res) => {
    if(req.query.company)
        return res.send(await Experience.find({ company: req.query.company}))
        
const experiences = await Experience.find({})
res.send(experiences)
});

experienceRouter.get("/:expId", async(req, res) => {

})

experienceRouter.post("/", async(req, res) => {
    try{
        const newExperience = await Experience.create(req.body)
        newExperience.save()
        res.send(newExperience)
    } catch(err) {
        res.status(500).send(err)
    }
})

experienceRouter.put("/:expId", async(req, res) => {

})

experienceRouter.delete("/:expId", async(req, res) => {

})

experienceRouter.post("/:expId/img", async(req, res) => {

})

experienceRouter.post("/:csv", async(req, res) => {

})


module.exports = experienceRouter