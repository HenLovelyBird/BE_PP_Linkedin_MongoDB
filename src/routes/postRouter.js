const express = require("express");

const Posts = require("../models/postSchema");
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

        newPost.save(() => {
                newPost.populate("username");
        });

        res.send({ success: "Post added", newPost });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
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
