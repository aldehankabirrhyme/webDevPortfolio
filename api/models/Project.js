const mongoose3 = require('mongoose');


const ProjectSchema = new mongoose3.Schema({
    user: { type: mongoose3.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    projectDescription: String,
    technologies: [String],
    image: String,
    src: String,
    codeSrc: String,
    isVisible: { type: Boolean, default: true }, // এটি আপনার ভিজিবিলিটি কন্ট্রোল করবে
}, { timestamps: true });

module.exports = mongoose3.model('Project', ProjectSchema);