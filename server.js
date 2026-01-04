require('dotenv').config();
const app = require("./src/app");
const { pool } = require("./src/config/database");
const PORT = process.env.PORT || 300;


// Testing Database connection
pool.query('SELECT NOW()', (err, res) => {
    if(err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
    console.log("Database connected successfully");
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})

// Shutting down the server 
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        pool.end(() => {
            console.log('Database pool closed');
            process.exit(0);
        });
    });
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1))
})