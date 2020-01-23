const express = require("express");
const { Profile } = require("../controllers/index.controller");
const Profiles = require("../models/profileSchema")
const multer = require("multer")
const path = require("path")
const fs = require ("fs-extra")
const profileRouter = express.Router();

// As we have a controller folder for scalability the logic should be kept out of here
// We call only the controller methods

//  profileRouter.get("/", Profile.getAll);

// profileRouter.post("/", Profile.create);



profileRouter.get("/", async (req, res) => {
    const profilesCount = await Profiles.countDocuments();

    try {
        const query = req.query;
        const { limit, skip, sort } = query;
        delete query.limit;
        delete query.skip;
        delete query.sort;
        const profiles = await Profiles.find(query)
            .sort({ [sort]: 1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        res.send({ Total: profilesCount, profile });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});




profileRouter.get("/:id", async (req, res) => {
    try {
        const profile = await Profiles.findById(req.params.id);
        if (profile) {
            res.send(profile);
        } else {
            res.status(404).send("Cannot find the profile with the id");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


profileRouter.post("/", async (req,res)=>{
    // let newInfo = {...req.body, 
    //     createdAt: new Date()}
    
        try {
            const newProfile= await Profiles.create(req.body)
            
            newProfile.save()
            res.send(newProfile)
    
    
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
});


const multerConfig = multer({})
profileRouter.post("/:username/picture", multerConfig.single("profileImg"), async (req, res) => {   
   
    try {
        
        const fileName = req.params.username + path.extname(req.file.originalname)

    const newImageLocation = path.join(__dirname, "../../images", fileName) 
    await fs.writeFile(newImageLocation, req.file.buffer)

    req.body.imageUrl = req.protocol + "://" + req.get("host") + "/images/" + fileName

    const newProfileUrl = await Profiles.findOneAndUpdate({username: req.params.username}, {
        $set: {"imageUrl": req.body.imageUrl}
    })


    newProfileUrl.save()
    res.send("Image URL updated")



    } catch (ex) {
      res.status(500).send(ex);
      console.log(ex);
    }
  });


profileRouter.put("/:id", async (req,res)=>{
    try {
        const profileForEdit = await Profiles.findByIdAndUpdate(req.params.id, {
            $set:{
                ...req.body,updatedAt: new Date()
            }
        })

        if(profileForEdit){
            res.send("Updated!")
        }
      
    else  {
        res.status(404).send(`student with id: ${req.params.id} is not found !`)
    }  
       
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

});

profileRouter.delete("/:id", async (req, res) => {
    try {
        const deletedProfile = await Profiles.findByIdAndDelete(req.params.id);

        if (deletedProfile) res.status(200).send(" Successffully Deleted");
        else
            res.status(404).send(
                `student with id: ${req.params.id} not found for deletion!`
            );
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});



/**
 * 
 *
 
 try {
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

 * */




module.exports = profileRouter;
