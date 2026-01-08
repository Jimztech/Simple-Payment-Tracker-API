const authService = require('../services/authService');

const authenticate = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.subString(7);

        // Verify token
        const decoded = authService.verifyToken(token);
        if(!decoded) {
            return res.status(401).json({ error: 'Invalid or expired token' });        
        }

        // Attach user info to request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' })
    }
};

module.exports = authenticate;