const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile.js');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const contactRoute = require('./routes/contact.js');


const app = express();


app.use(express.json({limit: '5mb'}));
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(morgan('dev'));

const path = require('path');
const uploadRoutes = require('./uploadRoutes');

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Upload route
app.use('/api/upload', uploadRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use("/api/contact", contactRoute);

app.get('/', (req, res) => res.send('MERN Portfolio Backend is running'));


const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';


mongoose
.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('MongoDB connected');
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})
.catch((err) => {
console.error('MongoDB connection error:', err.message);
process.exit(1);
});