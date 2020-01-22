const Post = require('../models/postSchema');

const PostController = {
    async getAll(req, res) {
        await Post.find({})
            .then(posts => res.json(posts))
            .catch(err => res.json(err));
    },

    async create(req, res) {
        console.log(req.body);
        const newPost = new Post(req.body);
        await newPost
            .save()
            .then(() =>
                res.json({
                    message: "New post added",
                    data: req.body
                })
            )
            .catch(err =>
                res.status(400).json({
                    Msg: "Creation of a new post failed",
                    Error: err
                })
            );
    }
};

module.exports = PostController;