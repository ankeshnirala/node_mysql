const AppError = require('./../utils/appError');

let handle_ER_DUP_ENTRY_ERROR = err => {
    let message = err.sqlMessage;
    return new AppError(message, 400);
}

let handle_ER_BAD_FIELD_ERROR = err => {
    let message = err.sqlMessage;
    return new AppError(message, 400);
}

let handle_WARN_DATA_TRUNCATED = err => {
    let message = err.sqlMessage;
    return new AppError(message, 400);
}

let handle_ER_BAD_NULL_ERROR = err => {
    let message = err.sqlMessage;
    return new AppError(message, 400);
}

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
        console.error('ERROR: ', err);
        
        res.status(500).json({
            status: 'ERROR!!!!!',
            message: 'SOMETHING WENT VERY WRONG!!'
        });
    }
}

module.exports = (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'ERROR!!';
    
    if(process.env.NODE_ENV ==='development'){
        sendErrorDev(error, res);
    }else if(process.env.NODE_ENV === 'production'){
        
        
        let new_error = {...error};
        if(new_error.code === 'ER_DUP_ENTRY') new_error = handle_ER_DUP_ENTRY_ERROR(new_error)
        if(new_error.code === 'ER_BAD_FIELD_ERROR') new_error = handle_ER_BAD_FIELD_ERROR(new_error)
        if(new_error.code === 'WARN_DATA_TRUNCATED') new_error = handle_WARN_DATA_TRUNCATED(new_error)
        if(new_error.code === 'ER_BAD_NULL_ERROR') new_error = handle_ER_BAD_NULL_ERROR(new_error)

        sendErrorProd(new_error, res);
    }
}