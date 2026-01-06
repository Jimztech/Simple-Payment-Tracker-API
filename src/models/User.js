const { pool } = require("../config/database");

const User = {
    async create(email, passwordHash, fullName) {
        const query = `
            INSERT INTO users (email, password_hash, full_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, full_name, created_at
        `;

        const result = await pool.query(query, [email, passwordHash, fullName]);
        return result.rows[0];
    },

    // Find user by email
    async findEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    // Find user by ID
    async findById(id) {
        const query = 'SELECT id, email, full_name, created_at FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
};

module.exports = User;