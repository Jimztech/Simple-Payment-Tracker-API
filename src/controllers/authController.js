const User = require("../models/User");
const authService = require('../services/authService');

const authController = {
    async register(req, res, next) {
        try {
            const { email, password, fullName } = req.body;

            // check if user already exists
            const existingUser = await User.findByEmail(email);
            if(existingUser) {
                return res.status(409).json({ error: "Email already registered" });
            }

            // Hash password
            const passwordHash = await authService.hashPassword(password);

            // Create user
            const user = await User.create(email, passwordHash, fullName);

            // Generate token
            const token = authService.generateToken(user.id, user.email);

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.full_name
                },
                token
            });
        } catch (error) {
            next(error)
        }
    },

    // Login user
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findByEmail(email);
            if(!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Check password
            const isValidPassword = await authService.comparePassword(
                password,
                user.password_hash
            );
            if(!isValidPassword) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Generate token
            const token = authService.generateToken(user.id, user.email);

            res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.full_name
                },
                token
            });
        } catch (error) {
            next(error);
        }
    },

    // Get current user (protected route example)
    async getProfile(req, res, next) {
        try {
            const user = await User.findById(req.user.userId);
            if(!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json({ user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authController;