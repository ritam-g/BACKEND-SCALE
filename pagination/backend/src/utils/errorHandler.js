// Custom error handler class
class AppError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

// Error handling middleware wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    AppError,
    asyncHandler,
};
