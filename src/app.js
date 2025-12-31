const express = require("express")
const app = express()
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const errorHandler = require("./middleware/errorHandler")


//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging (simple version)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})


// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date()})
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/transaction', transactionRoutes)


// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// Global error handler 
app.use(errorHandler)

module.exports = app