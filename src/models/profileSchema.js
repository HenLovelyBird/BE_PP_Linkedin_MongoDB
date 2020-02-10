// Profile Schema model
// Embedded we have the Experience as []
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const experienceSchema = new mongoose.Schema({
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

    username: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false,
        default: "https://via.placeholder.com/150"
    }
});

const profileSchema = new mongoose.Schema({
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
        default: "https://picsum.photos/200"
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    experience: [experienceSchema],

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
});

const collectionName = "profiles";
const Profile = mongoose.model(collectionName, profileSchema);

module.exports = Profile;
