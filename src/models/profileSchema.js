// Profile Schema model
// Embedded we have the Experience as []
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const passportLocalMongoose = require("passport-local-mongoose")


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
        required: false
        // default: "https://via.placeholder.com/150"
    }
});

const profileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    firstname: {
        type: String,
        required: false
    },

    surname: {
        type: String,
        required: false
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: false,
        validate: {
            validator: string => isEmail(string),
            message: "Provided email is invalid"
        }
    },

    bio: {
        type: String,
        required: false
    },

    role: {
        type: String,
        required: true,
        default: "user"
    },

    area: {
        type: String,
        required: false
    },

    image: {
        type: String,
        required: false
        // default: "https://picsum.photos/200"
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

profileSchema.plugin(passportLocalMongoose)

const collectionName = "profiles";
const Profile = mongoose.model(collectionName, profileSchema);

module.exports = Profile;
