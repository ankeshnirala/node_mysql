class AppError extends Error {
    constructor(message, statusCode){
        super(message);     //calling built in error from Error interface

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'Failed' : 'ERROR!!';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;