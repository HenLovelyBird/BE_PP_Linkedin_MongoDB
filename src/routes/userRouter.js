


//this will check the user credentials (username and password in the body) and generate a new token
userRouter.post("/signin", passport.authenticate("local"), async(req, res)=>{
    const token = getToken({ _id: req.user._id, username: req.user.username })
    res.send({
        access_token: token,
        user: req.user.username
    })
})

//this will check the user credentials (access token) and generate a new token
userRouter.post("/refresh", passport.authenticate("jwt"), async(req, res)=>{
    const token = getToken({ _id: req.user._id })
    res.send({
        access_token: token,
        user: req.user
    })
})

//this will check the Authorization: Bearer Token and return the current user
userRouter.get("/bankaccounts", passport.authenticate("jwt"), async (req, res)=>{
    res.send(req.user);
})

userRouter.post("/changepassword", passport.authenticate("local"), async(req, res)=>{
    const user = await User.findById(req.user._id)
    const result = await user.setPassword(req.body.newPassword)
    user.save() // <= remember to save the object, since setPassword is not committing to the db
    console.log(result) 
    res.send(result) 
}
)

module.exports = userRouter;