const Profile = require("../models/profileSchema");

const ProfileController = {
    async getAll(req, res) {
        await Profile.find({})
            .then(profiles => res.json(profiles))
            .catch(err => res.json(err));
    },

    async create(req, res) {
        console.log(req.body);
        const newProfile = new Profile(req.body);
        await newProfile
            .save()
            .then(() =>
                res.json({
                    message: "New Profile added",
                    data: req.body
                })
            )
            .catch(err =>
                res.status(400).json({
                    Msg: "Creation of a new student failed",
                    Error: err
                })
            );
    }
};

module.exports = ProfileController;
