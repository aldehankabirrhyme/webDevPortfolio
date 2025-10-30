const express7 = require('express');
const router3 = express7.Router();
const auth2 = require('../middleware/auth');
const Project3 = require('../models/Project');
const fs = require('fs');


// List all projects for logged in user
router3.get('/', auth2, async (req, res) => {
try {
const projects = await Project3.find({ user: req.userId }).sort({ createdAt: -1 }).lean();
res.json({ projects });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Get single project
router3.get('/:id', auth2, async (req, res) => {
try {
const project = await Project3.findById(req.params.id).lean();
console.log(project);
if (!project || String(project.user) !== String(req.userId)) return res.status(404).json({ message: 'Not found' });
res.json({ project });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Create project
router3.post('/', auth2, async (req, res) => {
try {
const { title, description, projectDescription, technologies, image ,src,codeSrc} = req.body;
const project = new Project3({ user: req.userId, title, description, projectDescription, technologies, image,src,codeSrc });
await project.save();
res.json({ project });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Update project
router3.put('/:id', auth2, async (req, res) => {
try {
const project = await Project3.findById(req.params.id);
if (!project || String(project.user) !== String(req.userId)) return res.status(404).json({ message: 'Not found' });

if(req.body.image !== undefined ){
    const newImageUrl = req.body.image.substring(1);
    const oldImagePath = project.image.substring(1);
    if(newImageUrl!== oldImagePath && fs.existsSync(oldImagePath)){
        try {
        fs.unlinkSync(oldImagePath);
        console.log(`File '${oldImagePath}' deleted successfully.`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`File '${oldImagePath}' does not exist.`);
        } else {
          console.error(`Error deleting file '${oldImagePath}':`, error);
        }
      }
    }
}



['title', 'description', 'projectDescription', 'technologies', 'image','src','codeSrc'].forEach(async (k) => {
if (req.body[k] !== undefined) project[k] = req.body[k];

});
await project.save();
res.json({ project });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Delete project
router3.delete('/:id', auth2, async (req, res) => {
try {
const project = await Project3.findById(req.params.id);
if (!project || String(project.user) !== String(req.userId)) return res.status(404).json({ message: 'Not found' });
await project.remove();
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router3;