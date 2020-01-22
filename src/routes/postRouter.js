const express = require("express");

const Posts = require("../models/postSchema")
const multer = require("multer")
const path = require("path")
const fs = require ("fs-extra")
const postRouter = express.Router();


postRouter.get("/", async(req, res) => {
    
    const posts = await Posts.find({})  
    res.send(posts)  
});

postRouter.post("/", async (req, res) => {
    try {
        const newPost = await Posts.create(req.body);
        console.log(req.body);
        newPost.save();
        res.send(newPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = postRouter;
