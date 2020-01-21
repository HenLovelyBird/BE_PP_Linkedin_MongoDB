const mongoose = require("mongoose")

const ExperienceSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    }
 
    
}, { timestamps: true });

// Nesting example:
// const BookSchema = new Schema({
//     title: String,
//     author: String,
//     year: String,
//     genre: Array,
//     description: String,
//     price: Number,
//     quantity: Number
// });
// const UserSchema = new Schema({
//     name: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     surname: String,
//     age: {
//         type: Number,
//     },
//     username: String,
//     cart: [BookSchema]
// });
    


const experiencescollection = mongoose.model("experience", ExperienceSchema);

module.exports = experiencescollection;