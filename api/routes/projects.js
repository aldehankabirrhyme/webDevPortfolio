const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// ১. List all (Public View) - শুধুমাত্র isVisible: true প্রজেক্টগুলো দেখাবে
router.get('/public', async (req, res) => {
  try {
    const projects = await Project.find({ isVisible: true }).sort({ createdAt: -1 }).lean();
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// ২. List for Dashboard (Private) - আপনার ড্যাশবোর্ডের জন্য সব প্রজেক্ট দেখাবে
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId }).sort({ createdAt: -1 }).lean();
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ৩. Create Project
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, projectDescription, technologies, image, src, codeSrc, isVisible } = req.body;
    const project = new Project({ 
      user: req.userId, 
      title, description, projectDescription, technologies, image, src, codeSrc, isVisible 
    });
    await project.save();
    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Could not save project' });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).lean();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.isVisible) {
       return res.status(404).json({ message: 'Project is hidden' });
    }

    res.json({ status: 'success', project });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Project ID' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ৪. Update Project with File Management
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.userId });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // ইমেজ আপডেট হলে পুরনো ইমেজ মুছে ফেলার লজিক
    if (req.body.image && project.image && req.body.image !== project.image) {
      const oldPath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Dynamic updates including isVisible
    const updates = ['title', 'description', 'projectDescription', 'technologies', 'image', 'src', 'codeSrc', 'isVisible'];
    updates.forEach(field => {
      if (req.body[field] !== undefined) project[field] = req.body[field];
    });

    await project.save();
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// ৫. Delete Project (Cleanup VPS Storage)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.userId });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // সার্ভার থেকে ইমেজ ডিলিট করা
    if (project.image) {
      const imagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await project.deleteOne();
    res.json({ message: 'Project and associated image deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;