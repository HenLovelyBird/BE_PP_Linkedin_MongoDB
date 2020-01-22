const mongoose  = require('mongoose');
const schema = ({
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
    }

}, { timestamps: true });

const collectionName = "posts";
const postSchema = mongoose.Schema(schema);
const Post = mongoose.model(collectionName, postSchema);

module.exports = Post;