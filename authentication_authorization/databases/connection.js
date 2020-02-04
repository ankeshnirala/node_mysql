const sql     = require('mysql2');
const dotenv    = require('dotenv');

dotenv.config({path: './../../../../config.env'});
dotenv.config({path: './config.env'});

const connection = sql.createPool({
    host: process.env.MYSQL_DB_SERVER,
    user: process.env.MYSQL_USER_NAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.MYSQL_DB_PORT,
    multipleStatements: true
});

module.exports = connection.promise();