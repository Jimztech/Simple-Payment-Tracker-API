const { pool } = require('../config/database');
const { findById } = require('./User');

const Transaction = {
    // create a new transaction
    async create(userId, type, amount, category, description, transactionDate) {
        const query = `
            INSERT INTO transactions (user_id, type, amount, category, description, transaction_date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const result = await pool.query(query, [
            userId, 
            type, 
            amount, 
            category, 
            description, 
            transactionDate
        ]);
        return result.rows[0];
    },

    // get all transactions for a user
    async findByUserId(userId, limit = 50, offset = 0) {
        const query = `
            SELECT * FROM transactions
            WHERE user_id = $1
            ORDER BY transaction_date DESC, created_at DESC
            LIMIT $2 OFFSET $3
        `;
        const result = await pool.query(query, [userId, limit, offset]);
        return result.rows;
    },

    // get a single transaction by ID
    async findById(id, userId) {
        
    }
}