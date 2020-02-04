const AppError = require('./../utils/appError');

let handle_ER_DUP_ENTRY_ErrorDB = err => {
    let message = err.sqlMessage;
    return new AppError(message, 400);
};

let handle_JWT_Error = err => {
    return new AppError('Invalid token. Please log in again!', 401);
};

let handle_TokenExpiredError = err => {
    return new AppError('Your token has expired. Please log in again!', 401);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }else{
        console.error('ERROR: ', err);
        
        res.status(500).json({
            status: 'ERROR!!!!!',
            message: 'SOMETHING WENT VERY WRONG!!'
        });
    }
};

module.exports = (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'ERROR!!';

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(error, res);
    }else if(process.env.NODE_ENV === 'production'){
        
        if(error.name === 'JsonWebTokenError') error = handle_JWT_Error(error);
        if(error.name === 'TokenExpiredError') error = handle_TokenExpiredError(error);
        if(error.code === 'ER_DUP_ENTRY') error = handle_ER_DUP_ENTRY_ErrorDB(error);
        
        sendErrorProd(error, res);
    }
};