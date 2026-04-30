const mongoose4 = require('mongoose');


const SkillSchema = new mongoose4.Schema({
    user: { type: mongoose4.Schema.Types.ObjectId, ref: 'User', required: true },
    category: String,
    iconName: String, // store an icon key; map it in frontend to a React icon
    items: [String],
}, { timestamps: true });


module.exports = mongoose4.model('Skill', SkillSchema);