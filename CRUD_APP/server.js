const app     = require('./app');
const dotenv  = require('dotenv');
const chalk   = require('chalk');

dotenv.config({path: './config.env'});
const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(chalk.green.inverse(`Your app is started on: ${port}`));
});
