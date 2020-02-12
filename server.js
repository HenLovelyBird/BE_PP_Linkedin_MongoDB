// Server should contain only server initializations as it is an index
// Less is modified is better
// We put here all which need to be init with the server
// Routes, models or else not related is called by an index and no here
// In this way we i prove scalability
const config = require("./src/config/config");
const express = require("express");
// const atob = require("atob")
const authRouter = require('./src/routes/authRouter.js')
// const { basic, adminOnly, setUserInfo } = require("./src/utils/auth")
const mongoose = require("./src/db/dbConnect");
const passport = require("passport")
const cors = require("cors");
const server = express();
const listEndpoints = require("express-list-endpoints");
// Logger API calls in console
const morgan = require("morgan");

const path = require("path")
const db = require("./src/db/dbConnect")
const routes = require("./src/routes/index.routes")
const userRoute = require ("./src/routes/userRouter")
const profileRoute = require("./src/routes/profileRouter")
const experienceRoute = require("./src/routes/experienceRouter")
const postRoute = require("./src/routes/postRouter")
const likesRoute = require("./src/routes/likesRouter")
const commentRoute = require("./src/routes/commentRouter")


server.use(express.json());
server.use(express.static(path.join(__dirname, "./images")));
server.use(cors());

server.use("/images", express.static(path.join(__dirname, "images")))

server.use(morgan("dev"));

server.use(routes);
// server.use("/auth", authRouter)
server.use("/users", userRoute)
server.use("/experiences", experienceRoute)
server.use("/profiles", profileRoute)
server.use("/posts", postRoute)
server.use("/likes", likesRoute)
server.use("/comments", commentRoute)


server.get("/", async (req, res) => {
    res.send("server is working");
});

// server.get("/testAuth", basic, setUserInfo, async (req, res) =>{
//     res.send(req.user)

// })


console.log(listEndpoints(server));

const port = config.server.port || 7001;

server.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
});
