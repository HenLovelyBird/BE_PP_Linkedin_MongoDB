// const express = require("express")
// const User = require("../models/userAuthSchema.js")
// const { basic } = require('../utils/auth.js')


// const authRouter = express.Router()

// //basic middleware is putting a restriction on having basic auth to access the users list
// authRouter.get("/", basic, async (req, res)=>{
//     res.send(await User.find({}))
// })

// authRouter.post("/register", async(req, res)=>{
//     try{
//         const user = await User.register(req.body, req.body.password);
//         res.send(user)
//     }
//     catch(ex){
//         console.log(ex)
//         res.status(500).send(ex)
//     }

// })

// module.exports = authRouter;