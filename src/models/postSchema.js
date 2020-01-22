const mongoose  = require('mongoose');
const schema = {
    text:{
        type:String,
        required: true
    },
    username :{
        type:String,
        required: true
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150"
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
}

const collectionName = "posts";
const postSchema = mongoose.Schema(schema);
const Post = mongoose.model(collectionName, postSchema);

module.exports = Post;