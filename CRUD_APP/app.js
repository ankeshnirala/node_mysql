const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const userRouter  = require('./routes/usersRoute');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/users', userRouter);

module.exports = app;
