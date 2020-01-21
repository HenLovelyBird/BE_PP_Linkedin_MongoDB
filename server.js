// Server should contain only server initializations as it is an index
// Less is modified is better
// We put here all which need to be init with the server
// Routes, models or else not related is called by an index and no here
// In this way we i prove scalability
const config = require("./src/config/config");
const express = require("express");
const cors = require("cors");
const server = express();
const listEndpoints = require("express-list-endpoints");
// Logger API calls in console
const morgan = require("morgan");
const db = require("./src/db/dbConnect")
const routes = require("./src/routes/index.routes")

const port = config.server.port || 7001;

server.use(express.json());
server.use(cors());

server.use(morgan("dev"));

server.use(routes);

server.get("/", async (req, res) => {
    res.send("server is working");
  });

console.log(listEndpoints(server));

server.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
