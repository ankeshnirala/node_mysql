const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const userRouter  = require('./routes/usersRoute');
const bookRouter  = require('./routes/booksRoute');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

module.exports = app;
