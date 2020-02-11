const express = require("express")
const User = require("../models/authSchema.js")


const authRouter = express.Router()

authRouter.get("/", async (req, res)=>{
    res.send(await User.find({}))
})

authRouter.post("/register", async(req, res)=>{
    try{
        const user = await User.register(req.body, req.body.password);
        res.send(user)
    }
    catch(ex){
        console.log(ex)
        res.status(500).send(ex)
    }
})

module.exports = authRouter;