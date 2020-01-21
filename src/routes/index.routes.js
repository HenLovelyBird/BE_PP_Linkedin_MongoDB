// URL
const { server } = require("../config/config");
// Express Lib
const express = require("express");
// Routes lib
const router = express.Router();

// Defining the Index Routers
router.use(server.url + "profiles", require("./profileRouter"));
// router.use(server.url + "experiences", require("./experiences"));
// router.use(server.url + "posts", require("./posts"));

// Exporting the Index Router
module.exports = router;
