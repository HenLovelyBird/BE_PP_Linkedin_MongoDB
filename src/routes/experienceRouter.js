const express = require("express");
// const fs = require("fs-extra")
const { check } = require("express-validator");
// const multer = require("multer")
// const multerConfig = multer()
const Profiles = require("../models/profileSchema");
const { ObjectID } = require("mongodb");

const experienceRouter = express.Router();

// GET One Profile and all its experiences
experienceRouter.get("/:username", async (req, res) => {
    try {
        const profileWithExperiences = await Profiles.aggregate([
            { $match: { username: req.params.username } },
            {
                $addFields: {
                    experiences_count: {
                        $size: "$experience"
                    }
                }
            },
            {
                $project: {
                    experiences_count: 1,
                    username: 1,
                    experience: 1,
                    _id: 0
                }
            }
        ]);

        if (profileWithExperiences.length > 0) {
            res.send({ profileExperiences: profileWithExperiences });
            //you can also return like this
            //res.send({ profileExperiences: profileWithExperiences[0] });
        } else {
            res.status(400).send("No profile found for username");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// GET a Profile and One experience
experienceRouter.get("/:username/experience/:expId", async (req, res) => {
    try {
        const profileWithExperience = await Profiles.aggregate([
            { $match: { username: req.params.username } },
            {
                $unwind: "$experience"
            },

            {
                $match: { "experience._id": new ObjectID(req.params.expId) }
            },

            {
                $project: {
                    username: 1,
                    experience: 1,
                    _id: 0
                }
            }
        ]);

        if (profileWithExperience.length > 0) {
            res.send({ profileExperience: profileWithExperience });
        } else {
            res.status(404).send("No profile found for username");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

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

        if (addProfileExperience) res.status(200).send(addProfileExperience);

        res.status(400).send({ Message: "failed to POST" });
    } catch (error) {
        res.status(500).send(error);
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
                username: req.params.username
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
