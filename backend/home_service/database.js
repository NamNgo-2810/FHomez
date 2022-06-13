const mysql = require("mysql");
require("dotenv").config();

module.exports = mySQLConnect();

function mySQLConnect() {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
        });
        connection.connect((err) => {
            if (err) console.log(err);
            console.log("MySQL connected success");
        });
        return connection;
    } catch (error) {
        console.log(error);
    }
}
