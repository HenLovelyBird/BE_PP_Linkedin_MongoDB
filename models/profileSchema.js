const mongoose = require("mongoose");

const validateEmail = email => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

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
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },

  bio: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required:true
  },
  area: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false,
    default:
      "https://via.placeholder.com/150"
  },
  username: {
    type: String,
    required: true,
    unique:true
  },
  experience: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "experiences"
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
});

profileCollection = mongoose.model("profiles", profileSchema);

module.exports = profileCollection;
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
