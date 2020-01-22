const express = require("express");
// const fs = require("fs-extra")
const { check } = require("express-validator");
// const multer = require("multer")
// const multerConfig = multer()
const Profiles = require("../models/profileSchema");

const experienceRouter = express.Router();

// POST, PUT, DELETE :expId
// experiences/:username
// how to post experiences into a particular profile username/id?
// .push(...req.body)

// - GET https://striveschool.herokuapp.com/api/profile/userName/experiences
// Get user experiences
// experienceRouter.get("/:username", async(req, res) => {
//      const experiences = await Profiles.findOne({"username": req.params.username});
//      res.send(experiences)
// });

// experienceRouter.get("/:user/experiences", async (req, res) => {
//     try {
//         const profile = await Profiles.findOne({ username: req.params.user });
//         if (profile) {
//             res.send(profile);
//         } else {
//             res.status(404).send("Cannot find the profile with the id");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// });

experienceRouter.get("/:username", async (req, res) => {
    console.log(req.params.username);
    try {
        const experiences = await Profiles.findOne(
            { username: req.params.username },
            { experience: 1, username: 1, _id: 0 }
        ).lean();

        if (experiences) res.send(experiences);

        res.status(404).send({ Message: "Not found any experience" });
    } catch (error) {
        res.status(500).send(err);
    }
});

// - GET https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
// experienceRouter.get("/:expId", async(req, res) => {
//     const experience = await Experience.findById(req.params.expId);
//     if (experience) {
//         res.send(experience)
//     } else {
//         res.send("Check your Id and try again")
//     }
// })

// - POST https://striveschool.herokuapp.com/api/profile/userName/experiences
// Create an experience.
// experienceRouter.post("/", async(req, res) => {
//     try{
//         const newExperience = await Experience.create(req.body)
//         newExperience.save()
//         res.send(newExperience)
//     } catch(err) {
//         res.status(500).send(err)
//     }
// })

// POST
experienceRouter.post("/user/:username/", async (req, res) => {
    try {
        const newExperience = req.body;
        const addProfileExperience = await Profiles.findOneAndUpdate(
            { username: req.params.username },
            {
                $push: { experience: newExperience }
            }
        );
        console.log(addProfileExperience);
        res.send(addProfileExperience);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

// - PUT https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
experienceRouter.put("/user/:username/:expId", async (req, res) => {
    try {
        // const experienceToEdit = await Profiles.findOne(
        //     { "experience._id": req.params.expId },
        //     { _id: 0, "experience.$": 1 },
        //     { $set: { ...req.body } }
        // );

        const experienceToEdit = await Profiles.findOneAndUpdate(
            {
                username: req.params.username,
            },
            { "experience.$": 1, username: 1, _id: 0 },
            { $set: { ...req.body } }
        ).lean();

        if (experienceToEdit)
            res.send({ Message: "Update", experience: req.body });
        res.status(404).send("Not found");
    } catch (err) {
        res.status(404).send(err);
    }
});

// - DELETE https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
experienceRouter.delete("username/:expId", async (req, res) => {
    try {
        const experience = Profiles.findByIdAndDelete(req.params.expId);
        res.send(experience);
    } catch (error) {
        res.status(404).send(error + "check your id");
    }
});

// - POST https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId/picture
// Change the experience picture
// experienceRouter.post("/:expId/img",
//     [check("img")
//     .isURL()
//     .withMessage("only URL images are permitted")],
//     async(req, res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() })
//         }
//         const { img } = req.body;

// })

// - POST https://striveschool.herokuapp.com/api/profile/userName/experiences/CSV
// Download the experiences as a CSV
// experienceRouter.post("/:csv", async(req, res) => {

// })

module.exports = experienceRouter;
