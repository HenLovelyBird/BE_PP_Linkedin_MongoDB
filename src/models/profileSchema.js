// Profile Schema model
// Embedded we have the Experience as []
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const schema = {

    firstname: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: string => isEmail(string),
            message: "Provided email is invalid"
        }
    },

    bio: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    area: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: false,
        default: "https://via.placeholder.com/150"
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    experience: [
        {
            title: {
                type: String,
                required: true
            },
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
                type: Date
            },
            description: {
                type: String
            },
            area: {
                type: String
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
            },

            image: {
                type: String,
                required: false,
                default: "https://via.placeholder.com/150"
            }
        }
    ],

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

const collectionName = "profile";
const profileSchema = mongoose.Schema(schema);
const Profile = mongoose.model(collectionName, profileSchema);

module.exports = Profile;
// {
//     "_id": "5d84937322b7b54d848eb41b", //server generated
//     "name": "Diego",
//     "surname": "Banovaz",
//     "email": "diego@strive.school",
//     "bio": "SW ENG",
//     "title": "COO @ Strive School",
//     "area": "Berlin",
//     "image": ..., //server generated on upload, set a default here
//     "username": "admin",
//     "createdAt": "2019-09-20T08:53:07.094Z", //server generated
//     "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
// }
