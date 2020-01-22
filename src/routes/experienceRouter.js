const express = require("express")
// const fs = require("fs-extra")
const {check} = require('express-validator')
// const multer = require("multer")
// const multerConfig = multer()
const Experience = require("../models/experienceSchema")

const experienceRouter = express.Router();


// - GET https://striveschool.herokuapp.com/api/profile/userName/experiences
// Get user experiences
experienceRouter.get("/", async(req, res) => {
    
     const experiences = await Experience.find({})  
     res.send(experiences)  
});

// - GET https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
experienceRouter.get("/:expId", async(req, res) => {
    const experience = await Experience.findById(req.params.expId);
    if (experience) {
        res.send(experience)
    } else {
        res.send("Check your Id and try again")
    }
})

//const experience = await Profiles.find({"experience._id": req.params.expId}, {_id: 0, 'experience.$': 1});


// <-- OR-->
// experienceRouter.get("/:username", async (req, res) => {
//     console.log(req.params.username);
//     const profile = await Profiles.findOne(
//         { username: req.params.username },
//         { experience: 1, _id: 0 }
//     ).lean();
//     res.send(profile.experience);
// });


// - POST https://striveschool.herokuapp.com/api/profile/userName/experiences
// Create an experience. 
experienceRouter.post("/", async(req, res) => {
    try{
        const newExperience = await Experience.create(req.body)
        newExperience.save()
        res.send(newExperience)
    } catch(err) {
        res.status(500).send(err)
    }
})


/**
 * const newProject = req.body;
 const addProfileExperience = await Profiles.findOneAndUpdate({req.params.username},
      {
        $push: { experience: req.body}
      }
    );
 */




// - PUT https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
experienceRouter.put("/:expId", async(req, res) => {
    try {
        const experience = Experience.findByIdAndUpdate(
            {expId: req.params.expId },
            {$set: {...req.body}}
        );
        if (experience) {
            res.send(experience)
        }
    } catch(err) {
        res.status(404).send(err)
    }
})


/**
 * 
 
 delete req.body._id;

  let newInfo = { ...req.body, updatedAt: new Date() };

  let id = { _id: req.params._id };
  const editStudent = await Profiles.findOneAndUpdate(id, {
    $set: { experience: newInfo }
  });


  ALTERNATIVELY==>/:id/experience/:expId

   await Profiles.updateOne(
            {
              _id: new ObjectId(req.params.id),
              "experience._id": new ObjectId(req.params.expId)
            },
            { "experience.$": req.body }
          );

 */


// - DELETE https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
experienceRouter.delete("/:expId", async(req, res) => {
    try {
        const experience = Experience.findByIdAndDelete(req.params.expId)
        res.send(experience)
    } catch (error) {
        res.status(404).send(error + "check your id")
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


module.exports = experienceRouter