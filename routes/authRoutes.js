const express = require('express');
const { signup, login } = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

// Signup route
router.post('/signup', validateRequest, signup);

// Login route
router.post('/login', validateRequest, login);

module.exports = router;
