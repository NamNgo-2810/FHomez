const mysql = require("mysql");
const config = require("../config");
const connection = mysql.createConnection(config.db);

async function getAllHome() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM motel`, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        console.log(result);
        return result;
    });
}

module.exports = {
    getAllHome: getAllHome,
};
