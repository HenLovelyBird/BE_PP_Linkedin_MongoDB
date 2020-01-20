const mongoose  = require('mongoose');
const PostSchema = new mongoose.Schema({
    text:{
        type:String,
        required: '{PATH} is required!'
    },
    username :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Post',PostSchema);