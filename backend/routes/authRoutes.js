const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// रजिस्ट्रेशन API (POST /api/v1/user/register)
router.post('/register', registerUser);

// लॉगिन API (POST /api/v1/user/login)
router.post('/login', loginUser);

module.exports = router;