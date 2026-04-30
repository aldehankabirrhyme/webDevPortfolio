const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');

const router = express.Router();
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ 1. File Filter: Allow only specific extensions
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (jpg, png, webp) are allowed!'));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `portfolio-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// ✅ 2. Limits: Max 2MB per file to save VPS storage
const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } 
});

// Upload route
router.post('/', (req, res, next) => {
  // Use the multer middleware inside to handle errors properly
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading (e.g., file too large)
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred (e.g., wrong file type)
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl });
  });
});

module.exports = router;