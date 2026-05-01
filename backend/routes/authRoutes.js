const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Signup & Login
router.post('/signup', signup);
router.post('/login', login);

//Get all users
router.get('/all', protect, async (req, res) => {
    try {
        const users = await User.find().select('_id name email');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;