const express            = require('express');
const app                = express();
const morgan             = require('morgan');
const AppError           = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const usersRoute         = require('./routes/usersRoute');

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', usersRoute);
// app.use('/api/v1/tours', );

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find: ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;