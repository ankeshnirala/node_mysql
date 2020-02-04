const dotenv    = require('dotenv');
const chalk     = require('chalk');

dotenv.config({path: './../../../../config.env'});
const app       = require('./app');

let port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(chalk.greenBright.inverse(`APP IS RUNNING ON: ${port}`));
});