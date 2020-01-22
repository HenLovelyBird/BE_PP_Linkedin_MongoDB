/**
   {
        "_id": "5d93ac84b86e220017e76ae1", //server generated
        "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
        "username": "admin",
        "createdAt": "2019-10-01T19:44:04.496Z", //server generated
        "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
        "image": ... //server generated on upload, set a default here
    }
​
 */

const mongoose = require("mongoose");

const schema = {
    text: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: mongoose.Schema.Types.String,
        ref: "Profile",
        required: true
    },

    image: {
        type: String,
        default: "https://via.placeholder.com/150",
        required: false
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

const collectionName = "posts";
const postSchema = mongoose.Schema(schema);
const Post = mongoose.model(collectionName, postSchema);

module.exports = Post;
