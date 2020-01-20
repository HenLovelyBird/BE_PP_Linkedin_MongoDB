const express = require("express");
const { Profile } = require("../controllers/index.controller");

const profileRouter = express.Router();

// As we have a controller folder for scalability the logic should be kept out of here
// We call only the controller methods
profileRouter.get("/", Profile.getAll);

profileRouter.post("/", Profile.create);

module.exports = profileRouter;
