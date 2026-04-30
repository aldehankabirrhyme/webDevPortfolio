const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Skill = require('../models/Skill');

// ১. List skills (সবাই দেখতে পারবে, তাই auth মিডলওয়্যার সরিয়ে দিয়েছি)
// পোর্টফোলিওতে স্কিল লিস্ট পাবলিক হওয়া উচিত যাতে ভিজিটররা দেখতে পায়। 
// আপনি যদি শুধু অ্যাডমিন প্যানেলের জন্য চান, তবে auth রাখতে পারেন।
router.get('/', async (req, res) => {
    try {
        // lean() ব্যবহার করা হয়েছে পারফরম্যান্স বাড়ানোর জন্য
        const skills = await Skill.find().sort({ createdAt: 1 }).lean();
        res.json({ skills });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch skills' });
    }
});

// ২. Create skill
router.post('/', auth, async (req, res) => {
    try {
        const { category, iconName, items } = req.body;

        // সিম্পল ভ্যালিডেশন
        if (!category || !items || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Category and an array of items are required.' });
        }

        const skill = new Skill({
            user: req.userId,
            category,
            iconName,
            items
        });

        await skill.save();
        res.status(201).json({ status: 'success', skill });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while creating skill' });
    }
});

// ৩. Update skill
router.put('/:id', auth, async (req, res) => {
    try {
        const { category, iconName, items } = req.body;

        // findOneAndUpdate ব্যবহার করলে কোড অনেক ক্লিন হয় এবং ওনারশিপ চেক একসাথেই করা যায়
        const skill = await Skill.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { $set: { category, iconName, items } },
            { new: true, runValidators: true }
        );

        if (!skill) return res.status(404).json({ message: 'Skill not found or unauthorized' });

        res.json({ status: 'success', skill });
    } catch (err) {
        res.status(500).json({ message: 'Server error during update' });
    }
});

// ৪. Delete skill
router.delete('/:id', auth, async (req, res) => {
    try {
        // .remove() এর বদলে .deleteOne() বা .findOneAndDelete() ব্যবহার করুন
        const result = await Skill.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!result) return res.status(404).json({ message: 'Skill not found or unauthorized' });

        res.json({ status: 'success', message: 'Skill deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error during deletion' });
    }
});

module.exports = router;