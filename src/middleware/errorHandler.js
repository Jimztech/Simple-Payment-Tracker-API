const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    if(err.name === 'ValidationError') {
        statusCode = 400;
    }

    if(err.code === '23505') {
        statusCode = 409;
        message = "Resource already exists";
    }

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;