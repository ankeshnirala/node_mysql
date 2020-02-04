const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }else{
        console.log('ERROR!!', err);
        
        res.status(500).json({
            status: err.status,
            message: err.message
        });
    }
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'ERROR';

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(error, res);
    }else if(process.env.NODE_ENV === 'production'){
        let new_error = {...error};

        sendErrorProd(new_error, res);
    }
}