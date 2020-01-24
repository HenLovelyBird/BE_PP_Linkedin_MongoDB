const mongoose = require("mongoose");

const schema = {
    comment: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        username: {
            type: mongoose.Schema.Types.String,
            ref: "Profile",
            required: true
        }
    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    },

    updatedAt: {
        type: Date,
        default: Date.now,
        required: false
    }
};

const collectionName = "comments";
const commentSchema = mongoose.Schema(schema);
const Comment = mongoose.model(collectionName, commentSchema);

module.exports = Comment;
