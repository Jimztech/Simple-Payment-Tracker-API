const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

const authService = {
    // Hash password
    async hashPassword(password) {
        return await bcrypt.hash(password, SALT_ROUNDS);
    },

    // Compare password with hash
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    },

    // Generate JWT token
    generateToken(userId, email) {
        return jwt.sign(
            { userId, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
        );
    },

    // Verify jwt token
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
}

module.exports = authService;