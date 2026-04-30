const express8 = require('express');
const router4 = express8.Router();
const auth3 = require('../middleware/auth');
const Skill3 = require('../models/Skill');


// List skills
router4.get('/', auth3, async (req, res) => {
    try {
        const skills = await Skill3.find({ user: req.userId }).sort({ createdAt: -1 }).lean();
        res.json({ skills });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Create skill
router4.post('/', auth3, async (req, res) => {
    try {
        const { category, iconName, items } = req.body;
        const skill = new Skill3({ user: req.userId, category, iconName, items });
        await skill.save();
        res.json({ skill });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update skill
router4.put('/:id', auth3, async (req, res) => {
    try {
        const skill = await Skill3.findById(req.params.id);
        if (!skill || String(skill.user) !== String(req.userId)) return res.status(404).json({ message: 'Not found' });
        ['category', 'iconName', 'items'].forEach((k) => {
            if (req.body[k] !== undefined) skill[k] = req.body[k];
        });
        await skill.save();
        res.json({ skill });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Delete skill
router4.delete('/:id', auth3, async (req, res) => {
    try {
        const skill = await Skill3.findById(req.params.id);
        if (!skill || String(skill.user) !== String(req.userId)) return res.status(404).json({ message: 'Not found' });
        await skill.remove();
        res.json({ message: 'Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router4;