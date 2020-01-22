const express = require("express");

const Posts = require("../models/postSchema");
const Profiles = require("../models/profileSchema");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const postsCount = await Posts.countDocuments();

    try {
        const posts = await Posts.find({});

        if (posts.length === 0)
            res.status(404).send({ message: "No posts found" });

        res.send({ Total: postsCount, posts });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

postRouter.post("/", async (req, res) => {
    try {
        const newPost = await Posts.create(req.body);

        const username = await Profiles.findOne({
            username: req.body.username
        });

        if (!username) res.status(400).send({"Message": `Username >${req.body.username} was not found`});

        const addedPost = await newPost.save();
        addedPost.populate(username.username);

        res.send({ success: "Post added", newPost });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

postRouter.get("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post)
            res.status(404).send({
                message: "Post was not found",
                req: req.params.id
            });

        res.send(post);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

postRouter.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if (deletedPost) res.status(200).send({"Message": "Successfully Deleted"});

        res.status(404).send({
           "Message": `Post with id: ${req.params.id} not found for deletion!`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = postRouter;

/**
 - GET https://striveschool.herokuapp.com/api/posts/
    Retrieve posts
    - POST https://striveschool.herokuapp.com/api/posts/
    Creates a new post
    - GET https://striveschool.herokuapp.com/api/posts/{postId}
    Retrieves the specified post
    - PUT https://striveschool.herokuapp.com/api/posts/{postId}
    Edit a given post
    - DELETE https://striveschool.herokuapp.com/api/posts/{postId}
    Removes a post
    - POST https://striveschool.herokuapp.com/api/posts/{postId}
    Add an image to the post under the name of "post"
​
    #EXTRA: Find a way to return also the user with the posts, in order to have the Name / Picture to show it correcly on the frontend
​
 */
