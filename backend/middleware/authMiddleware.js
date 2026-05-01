const jwt = require('jsonwebtoken');

// Protect route
const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token, access denied" });
    }

    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token not valid" });
    }
};

// Admin only
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin only access" });
    }
    next();
};


module.exports = { protect, adminOnly };