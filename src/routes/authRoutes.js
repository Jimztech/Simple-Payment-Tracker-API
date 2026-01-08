const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/auth');
const {
    validateRegister,
    validateLogin,
    checkValidation
} = require('../middleware/validate');

// Public routes
router.post(
    '/register',
    validateRegister,
    checkValidation,
    authController.register
);

router.post(
    '/login',
    validateLogin,
    checkValidation,
    authController.login
);

// Protected route
router.get('/profile', authenticate, authController.getProfile);
module.exports = router;