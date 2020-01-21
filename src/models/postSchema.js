const mongoose  = require('mongoose');
const schema = {
    text:{
        type:String,
        required: true
    },
    username :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    image: {
        type: String,
        required: false,
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