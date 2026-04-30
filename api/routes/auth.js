const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// প্রোডাকশন লেভেলের ভ্যালিডেশন ফাংশন
const validatePassword = (pw) => pw && pw.length >= 8;

// Register
router.post('/register', async (req, res) => {
  try {
    if (process.env.ALLOW_REGISTRATION !== 'true') {
      return res.status(403).json({ message: 'Registration is closed for public users.' });
    }

    const { name, email, password } = req.body;

    if (!email || !validatePassword(password)) {
      return res.status(400).json({ message: 'Valid email and 8+ char password required.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() }); // ইমেইল কেস সেনসিটিভ হওয়া উচিত নয়
    if (existing) return res.status(400).json({ message: 'User already exists.' });

    const passwordHash = await bcrypt.hash(password, 12); // রাউন্ড ১২ দিলে সিকিউরিটি বাড়ে
    const user = new User({ name, email: email.toLowerCase(), passwordHash });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // ৭ দিন অনেক বেশি, ১ দিন বা ৮ ঘণ্টা সিকিউর
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Credentials required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    
    // হ্যাকারদের বিভ্রান্ত করতে ইমেইল বা পাসওয়ার্ড ভুল যাই হোক, একই মেসেজ দিন
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Password
router.put('/update-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !validatePassword(newPassword)) {
       return res.status(400).json({ message: 'Current password and new 8+ char password required.' });
    }

    // টোকেন ভেরিফিকেশন
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'Account not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect current password' });

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Invalid token' });
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;