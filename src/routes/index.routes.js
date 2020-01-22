// URL
const { server } = require("../config/config");
// Express Lib
const express = require("express");
// Routes lib
const router = express.Router();
const profileRouter = require("./profileRouter")
const experienceRouter = require("./experienceRouter")

// Defining the Index Routers
// router.use(server.url + "profiles", profileRouter);
router.use("/experiences", require("./experienceRouter"));
router.use("/posts", require("./postRouter"));

// Exporting the Index Router
module.exports = router;
