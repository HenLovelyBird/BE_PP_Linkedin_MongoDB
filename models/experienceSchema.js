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
       //default: server ??
    }
    // timestamps: true { 
    //     createdAt: 'createdAt', 
    //     updatedAt: 'updatedAt'
    // }
});

    


const experiencescollection = mongoose.model("experience", ExperienceSchema);