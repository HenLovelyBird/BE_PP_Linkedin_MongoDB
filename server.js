const express = require("express")
const cors = require("cors")
const server = express()
const mongoose = require ("mongoose")
const listEndpoints = require("express-list-endpoints")

console.log(process.env.mongoUri)
mongoose.connect(process.env.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(db => console.log("MongoDB Connected"))
  .catch(err => console.log("ERROR connecting to MongoDb", err));
 

server.use(express.json())
server.use(cors())
server.get("/", async (req, res) => {
    res.send("server is working")
})


const port = process.env.PORT || 7001

console.log(listEndpoints(server));

server.listen(port, () => {
    console.log(`Your server is running on port ${port}`)
})
