const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile.js');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const contactRoute = require('./routes/contact.js');
const uploadRoutes = require('./uploadRoutes');


const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const app = express();
const  server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

mongoose
    .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
       
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });




app.use(helmet({ crossOriginResourcePolicy: false, }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json({ limit: '1mb' }));
const logger = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use('/api', morgan(logger));

// Rate Limiting (Prevents Brute Force on your API)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later."
});
app.use('/api/', limiter);

app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        res.set('X-Content-Type-Options', 'nosniff'); // Prevents MIME type sniffing
    }
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        res.set('X-Content-Type-Options', 'nosniff'); // Prevents MIME type sniffing
    }
}));

// Upload route
app.use('/api/upload', uploadRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use("/api/contact", contactRoute);

app.get('/', (req, res) => res.send('MERN Portfolio Backend is running'));

app.use((err, req, res, next) => {
    // Log the error for your eyes only
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    // Hide specific error details from the user
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: statusCode === 500 ? 'Internal Server Error' : err.message,
    });
});





process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});