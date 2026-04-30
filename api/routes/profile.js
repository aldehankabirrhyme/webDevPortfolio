const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const fs = require("fs");
const path = require("path");

// ১. Get Full Profile (Public Access)
// এটি আপনার ফ্রন্টএন্ড হোমপেজের জন্য। এখানে auth ছাড়া সবাই এক্সেস করতে পারবে।
router.get('/', async (req, res) => {
  try {
    // সাধারণত পোর্টফোলিওতে একজনই ইউজার থাকে, তাই প্রথম ইউজারটি নেওয়া হচ্ছে।
    const user = await User.findOne().select("-passwordHash").lean(); 
    console.log("Fetched user profile:", user);
    if (!user) return res.status(404).json({ message: 'Profile data not found' });

    // শুধুমাত্র যে প্রজেক্টগুলো isVisible: true, সেগুলো পাবলিকলি দেখাবে।
    const projects = await Project.find({ isVisible: true }).sort({ createdAt: -1 }).lean();
    const projectsAdmin = await Project.find().sort({ createdAt: -1 }).lean();
    const skills = await Skill.find().sort({ createdAt: 1 }).lean();

    res.json({ user, projects, projectsAdmin, skills });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// ২. Update Profile (Admin Only)
router.put("/", auth, async (req, res) => {
  try {
    // req.userId আসছে আপনার auth middleware থেকে
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // ইমেজ ডিলিট করার জন্য একটি কমন ফাংশন (Clean Code Practice)
    const deleteOldFile = (relativeUrl) => {
      if (!relativeUrl) return;
      const fullPath = path.join(__dirname, "..", relativeUrl);
      try {
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log(`Successfully deleted: ${fullPath}`);
        }
      } catch (error) {
        console.error(`File deletion failed: ${fullPath}`, error);
      }
    };

    // ✅ Profile Image Replacement
    if (req.body.profileImageSrc && req.body.profileImageSrc !== user.profileImageSrc) {
      deleteOldFile(user.profileImageSrc);
      user.profileImageSrc = req.body.profileImageSrc;
    }

    // ✅ Cover Image Replacement
    if (req.body.aboutMeCoverImage && req.body.aboutMeCoverImage !== user.aboutMeCoverImage) {
      deleteOldFile(user.aboutMeCoverImage);
      user.aboutMeCoverImage = req.body.aboutMeCoverImage;
    }

    // ✅ Allowed Fields Update
    const allowed = [
      "name", "profession", "bioDetails", "aboutME", 
      "Email", "phoneNumber", "addressDetails", 
      "githubLink", "linkedinLink", "resumelink", 
      "fbLink", "formendpoint"
    ];

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    
    // পাসওয়ার্ড বাদে ইউজারের ডাটা পাঠানো
    const updatedUser = user.toObject();
    delete updatedUser.passwordHash;

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;