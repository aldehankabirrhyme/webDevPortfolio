const express6 = require('express');
const router2 = express6.Router();
const auth = require('../middleware/auth');
const User2 = require('../models/User');
const Project2 = require('../models/Project');
const Skill2 = require('../models/Skill');
const fs = require("fs");
const path = require("path")

// Get full profile (user + projects + skills)
router2.get('/', async (req, res) => {
  try {
    // const user = await User2.findById(req.userId).lean();
    const user = await User2.find().lean();
    // await User2.findByIdAndDelete("68a13bc2d5e6e7eab1eb645d");
    if (!user) return res.status(404).json({ message: 'User not found' });
    // const projects = await Project2.find({ user: req.userId }).lean();
    const projects = await Project2.find().lean();
    // const skills = await Skill2.find({ user: req.userId }).lean();
    const skills = await Skill2.find().lean();
    res.json({ user, projects, skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update profile (only allowed fields)
router2.put("/", auth, async (req, res) => {
  try {
    const user = await User2.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Handle profile image replacement
    if (req.body.profileImageSrc) {
      const newImageUrl = req.body.profileImageSrc.substring(1);
      const oldImagePath = user.profileImageSrc.substring(1);

      // Only delete if new image is different & old file exists
      if (oldImagePath && newImageUrl !== oldImagePath) {
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log(`Deleted old profile image: ${oldImagePath}`);
          } else console.log(`Old file not found: ${oldImagePath}`);

        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }

      user.profileImageSrc = `/${newImageUrl}`;
    }

    // ✅ Handle profile Cover image aboutMeCoverImage
    if (req.body.aboutMeCoverImage) {
      const newCoverImageUrl = req.body.aboutMeCoverImage.substring(1);
      const oldCoverImagePath = user.aboutMeCoverImage.substring(1);

      // Only delete if new image is different & old file exists
      if (oldCoverImagePath && newCoverImageUrl !== oldCoverImagePath) {
        try {
          if (fs.existsSync(oldCoverImagePath)) {
            fs.unlinkSync(oldCoverImagePath);
            console.log(`Deleted old profile Cover image: ${oldCoverImagePath}`);
          } else console.log(`Old file not found: ${oldCoverImagePath}`);

        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }

      user.aboutMeCoverImage = `/${newCoverImageUrl}`;
    }

    // ✅ Allowed fields update
    const allowed = [
      "name",
      "profession",
      "bioDetails",
      "aboutME",
      "Email",
      "phoneNumber",
      "addressDetails",
      "githubLink",
      "linkedinLink",
      "resumelink",
      "fbLink",
      "formendpoint"
    ];

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router2;

