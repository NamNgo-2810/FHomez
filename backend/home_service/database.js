const mysql = require("mysql");
const config = require("./config");

module.exports = mySQLConnect();

function mySQLConnect() {
    try {
        const connection = mysql.createConnection(config.db);
        connection.connect((err) => {
            if (err) console.log(err);
            console.log("MySQL connected success");
        });
        return connection;
    } catch (error) {
        console.log(error);
    }
}
