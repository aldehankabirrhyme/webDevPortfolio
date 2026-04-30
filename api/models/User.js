const mongoose2 = require('mongoose');


const AboutMESchema = new mongoose2.Schema({
    Starting: String,
    ProfessionalMilestone: String,
    Today: String,
}, { _id: false });


const UserSchema = new mongoose2.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    profileImageSrc: String,
    profession: String,
    bioDetails: String,
    aboutME: AboutMESchema,
    aboutMeCoverImage: String,
    Email: String,
    phoneNumber: String,
    addressDetails: String,
    githubLink: String,
    linkedinLink: String,
    resumelink: String,
    fbLink: String,
    formendpoint: String,
}, { timestamps: true });


module.exports = mongoose2.model('User', UserSchema);