const express = require("express");
// const { Profile } = require("../controllers/index.controller");
const profile = require("../models/profileSchema");
const userModel = require("../models/userSchema")
const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage")
const path = require("path");
const fs = require("fs-extra");
const generatePDF = require("../pdfConfig/pdfCreator");
const json2csv = require("json2csv").parse;
const { getToken } = require("../utils/auth")
const passport = require("passport")

const profileRouter = express.Router();

const upload = multer({
    storage: new MulterAzureStorage({
        azureStorageConnectionString: process.env.AZURE_STORAGE,
        containerName: 'images',
        containerSecurity: 'blob'
    })
})

// profileRouter.get("/", async (req, res) => {
//     console.log(req.user)
//     res.send(await profile.find())
// });

profileRouter.get("/", async (req, res) => {
    const profileCount = await profile.countDocuments();

    try {
        const query = req.query;
        const { limit, skip, sort } = query;
        delete query.limit;
        delete query.skip;
        delete query.sort;
        const profileList = await profiles.find(query)
            .sort({ [sort]: 1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        res.send({ Total: profileCount, profileList });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

profileRouter.get("/:id", async (req, res) => {
    try {
        const profileid = await profile.findById(req.params.id);
        if (profileid) {
            res.send(profileid);
        } else {
            res.status(404).send("Cannot find the profile with the id");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

profileRouter.get("/username/:username", async (req, res) => {
    try {
        let username = { username: req.params.username };
        const profile = await profile.findOne(username);
        if (profile) {
            res.send(profile);
        } else {
            res.status(404).send("Cannot find the profile with the username");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//get all experiences for a profile.username
profileRouter.get("/:username/experiences", async (req, res) => {
    try {
        console.log(req.params.username);
        const profile = await profile.findOne(
            { username: req.params.username },
            { experience: 1, _id: 0 }
        );
        res.send(profile.experience);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//get one experience with ID
profileRouter.get("/experiences/:expId/", async (req, res) => {
    try {
        const experience = await profile.find(
            { "experience._id": req.params.expId },
            { _id: 0, "experience.$": 1 }
        );
        res.send(experience);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

profileRouter.get("/pdf/:username/cv", async (req, res) => {
    try {
        const profileToPDF = await profile.findOne({
            username: req.params.username
        });
        if (!profileToPDF) {
            res.status(404).send("Not Found");
        } else {
            await generatePDF(profileToPDF);
            console.log(profileToPDF.username);
            const file = path.join(__dirname,`../pdfConfig/${profileToPDF.username}.pdf`
            );
            res.setHeader(
                "Content-Disposition",`attachment; filename=${req.params.username}.pdf`);
            fs.createReadStream(file).pipe(res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//Download the experiences as a CSV
// userName/experiences/CSV

profileRouter.get("/get/CSV/:username/experiences", async (req, res) => {
    try {
        const profile = await profile.findOne({
            username: req.params.username
        });
        const fields = ["company", "role", "title"];
        const opts = { fields };
        let csv = json2csv(profile.experience, opts);
        res.setHeader("Content-Disposition", `attachment; filename=file.csv`);
        res.send(csv);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//this creates a user starting from username and password
// profileRouter.post("/signup", async (req, res) => {
//     try{
//         const user = await userModel.register(req.body, req.body.password)
//         const token = getToken({ _id: user._id })
//             res.send({
//                 access_token: token,
//                 user: user
//             })
//         }
//     catch(exx){
//         console.log(exx)
//         res.status(500).send(exx)
//     }
// })

profileRouter.post("/",
    passport.authenticate('jwt',{ session: false }),
    async (req, res) => {
        console.log(req.user)
        try{
            const obj = {
                ...req.body,
                User: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const profile = await Profile.create(obj)
            res.send(profile);
        } catch (err) {
            res.status(500).send(err)
        }
    })

    profileRouter.post("/uploadPicture", 
        passport.authenticate("jwt"), //check the token and set the user info into req.user
        upload.single("image"), //save the picture and set the pic info into req.file
        async (req, res) => {

    if (req.user.image){ //if we have a previous image
        const container = blobClient.getContainerClient("images"); //we take a reference to the container
        const urlParts = req.user.image.split("/") // we select the name of the previous picture
        const filename = urlParts.reverse()[0]
        await container.deleteBlob(filename) // we delete the previous picture
    }

    //save into the database the url
    await userModel.findByIdAndUpdate(req.user._id, {
        image: req.file.url
    })
    //return the url
    res.send(req.file.url)
})

// profileRouter.post("/", async (req, res) => {
//     // let newInfo = {...req.body,
//     //     createdAt: new Date()}

//     try {
//         const newProfile = await profile.create(req.body);

//         newProfile.save();
//         res.send(newProfile);
//     } catch (error) {
//         res.status(500).send(error);
//         console.log(error);
//     }
// });

// const multerConfig = multer({});
// profileRouter.post(
//     "/:username/picture",
//     multerConfig.single("profileImg"),
//     async (req, res) => {
//         try {
//             const fileName =
//                 req.params.username + path.extname(req.file.originalname);

//             const newImageLocation = path.join(__dirname,"../../images",fileName);
//             await fs.writeFile(newImageLocation, req.file.buffer);

//             req.body.imageUrl = req.protocol + "://" + req.get("host") + "/images/" + fileName;

//             const newProfileUrl = await profile.findOneAndUpdate(
//                 { username: req.params.username },
//                 {
//                     $set: { imageUrl: req.body.imageUrl }
//                 }
//             );

//             newProfileUrl.save();
//             res.send("Image URL updated");
//         } catch (ex) {
//             res.status(500).send(ex);
//             console.log(ex);
//         }
//     }
// );

// profileRouter.put("/:userId", passport.authenticate("jwt"), async (req, res) => {
//     delete req.body.username,
//     delete req.body._id,
//     delete req.body.hash,
//     delete req.body.salt

//     if (req.user._id.toString() !== req.params.userId && req.user.role !== "glambot")
//         return res.status(401).send("Unauthorized!")
//     else {
//         const update = await profile.findByIdAndUpdate({ _id: req.params.userId }, req.body)
//         res.send(update)
//     }
// })

//multer-azure-storage and muluter created this upload (see line 21)
profileRouter.post("/profilePic", passport.authenticate("jwt"), upload.single("image"), async(req, res) => {
    console.log(req.file)
    await profile.findByIdAndUpdate(req.user._id, {
        image: req.file
    })
    res.send(req.file)
})

profileRouter.put("/:id", passport.authenticate("jwt"), async(req,res) => {
    const token = getToken({ _id: req.user._id })
    res.send({
        access_token: token,
        user: req.user
    })
})

profileRouter.put("/:id", async (req, res) => {
    delete req.body._id;

    try {
        const profileForEdit = await profile.findByIdAndUpdate(req.params.id, {
            $set: {
                ...req.body,
                updatedAt: new Date()
            }
        });

        if (profileForEdit) {
            res.send("Updated!");
        } else {
            res.status(404).send(
                `profile with id: ${req.params.id} is not found !`
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

profileRouter.delete("/:id", async (req, res) => {
    try {
        const deletedProfile = await profile.findByIdAndDelete(req.params.id);

        if (deletedProfile) res.status(200).send(" Successffully Deleted");
        else
            res.status(404).send(
                `profile with id: ${req.params.id} not found for deletion!`
            );
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

profileRouter.post("/experience/:username", async (req, res) => {
    // let newInfo = {...req.body,
    //     createdAt: new Date()}

    try {
        const newProject = req.body;
        const addProfileExperience = await profile.findOneAndUpdate(
            { username: req.params.username },
            {
                $push: { experience: newProject }
            }
        );
        console.log(addProfileExperience);
        res.send(addProfileExperience);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
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

// profileRouter.get("/user/experiences/:username/CSV", async(req,res)=>{
//     try {
//      const profile = await profile.findOne(
//          { username: req.params.username },
//          {  _id: 0,  experience: 1 }
//      )
//      ;

//       if(profile){

//          let experienceArray = profile.experience
//          console.log(experienceArray)

//   //const filePath = path.join(__dirname, experienceArray);

//    const fields = ["title", "role", "company", "startDate"];
//    const opts = { fields };

//    const json2csv = new Transform(opts);

//  res.setHeader("Content-Disposition", `attachment; filename=file.csv`);

//    fs.createReadStream(experienceArray)
//      .pipe(json2csv)

//       .pipe(res)

//  /*

//          const json2csvParser = new Parser({ header: true });
//          const csvData = json2csvParser.parse(experienceArray);

//          fs.writeFile("newCSV.csv", csvData, function(error) {
//            if (error) throw error;
//            console.log("done newCSV.csv successfully!");
//          });

//  /*

//   const filePath = path.join(__dirname, experienceArray);

//     const csvName = 'users'

//  const csvPath = path.join(__dirname, `../../images/file.csv`)

//       const stream = fs.createReadStream(filePath)
//       stream
//         .pipe(json2csv)
//         .pipe(fs.createWriteStream(csvPath))

//         stream.on("close", async ()=>{
//          console.log("close")
//          console.log((await fs.readFile(csvPath)).toString())
//           res.send("CSV SENT")
//         })

//         */

//       }
//     } catch (error) {
//        console.log(error)
//        res.status(500).send(error)
//     }
//  })
