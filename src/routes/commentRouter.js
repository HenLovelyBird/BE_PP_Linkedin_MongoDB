const express = require("express");
const Comment = require("../models/CommentSchema");

const commentRouter = express.Router();

commentRouter.get("/:postId", async (req, res) => {
    try {
        const comment = new Comment();
        comment._id = req.params.postId;

    } catch (err) {
        res.status(500).send(err);
    }
});

commentRouter.post("/:postId", async (req, res) => {
    try {
        const newComment = Comment.create(

        )

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = commentRouter;
