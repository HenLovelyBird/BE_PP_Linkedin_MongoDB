// Server should contain only server initializations as it is an index
// Less is modified is better
// We put here all which need to be init with the server
// Routes, models or else not related is called by an index and no here
// In this way we i prove scalability
const config = require("./src/config/config");

const express = require("express");
// const mongoose= require("mongoose")
const mongoose = require("./src/db/dbConnect");
const cors = require("cors");
const server = express();
const listEndpoints = require("express-list-endpoints");
// Logger API calls in console
const morgan = require("morgan");

const path = require("path")
const db = require("./src/db/dbConnect")
const routes = require("./src/routes/index.routes")


const profileRoute = require("./src/routes/profileRouter")
const experienceRoute = require("./src/routes/experienceRouter")
const postRoute = require("./src/routes/postRouter")




server.use(express.json());
server.use(express.static(path.join(__dirname, "./images")));
server.use(cors());

server.use("/images", express.static(path.join(__dirname, "images")))

server.use(morgan("dev"));

server.use(routes);

server.use("/experiences", experienceRoute)
server.use("/profiles", profileRoute)
server.use("/posts", postRoute)


server.get("/", async (req, res) => {
    res.send("server is working");
});

console.log(listEndpoints(server));

const port = config.server.port || 7001;

server.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
});
