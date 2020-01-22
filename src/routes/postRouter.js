const express = require("express");

const Posts = require("../models/postSchema");
const Profiles = require("../models/profileSchema");
const multer = require("multer");
const multerConfig = multer({});
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
        const { username } = req.body;

        const profile = await Profiles.findOne({ username });

        if (!profile) {
            return res.status(400).send({"Message": "Username not found"});
        }

        let newPost = await Posts.create(req.body);
        newPost.username = username;

        res.send({ success: "Post added", newPost });
    } catch (error) {
        res.status(500).send(error);
    }
});

//POST .../api/posts/{postId}
postRouter.post(
    "/uploadImg/:id",
    multerConfig.single("postImg"),
    async (req, res) => {
        try {
            const fileName =
                req.params.id + path.extname(req.file.originalname);

            const newImageLocation = path.join(
                __dirname,
                "../../images/posts",
                fileName
            );

            await fs.writeFile(newImageLocation, req.file.buffer);

            req.body.image =
                req.protocol +
                "://" +
                req.get("host") +
                "/images/posts/" +
                fileName;

            await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: { image: req.body.image }
                }
            ).save();

            res.send("Image URL updated");
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
);

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
    }
});

postRouter.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if (deletedPost)
            res.status(200).send({ Message: "Successfully Deleted" });

        res.status(404).send({
            Message: `Post with id: ${req.params.id} not found for deletion!`
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
