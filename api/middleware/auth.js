const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Authorization header missing' });
    const parts = header.split(' ');
    if (parts.length !== 2) return res.status(401).json({ message: 'Malformed Authorization header' });
    const token = parts[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};