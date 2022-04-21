const mysql = require("mysql");
const config = require("../config");
const bcrypt = require("bcryptjs");
const connection = mysql.createConnection(config.db);

async function userSignIn(phoneNumber, password) {
    try {
        connection.query(
            "SELECT * FROM test_user WHERE phoneNumber = ? AND password = ?",
            [phoneNumber, password],
            (error, result) => {
                if (error) throw error;
                console.log(result);
                return result;
            }
        );
    } catch (error) {
        console.log(error);
    }
}

async function userSignUp(phoneNumber, password) {
    try {
        connection.query(
            `INSERT INTO test_user (phoneNumber, password) VALUES ('${phoneNumber}', '${password}')`,
            (error, result) => {
                if (error) throw error;
                // console.log(result);
                return result;
            }
        );
    } catch (error) {
        console.log(error);
    }
}

async function checkUserExist(phoneNumber) {
    try {
        let exist = await connection.query(
            "SELECT * FROM test_user WHERE phoneNumber = ?",
            [phoneNumber],
            (error, result) => {
                if (error) throw error;
                return result.length > 0;
            }
        );

        console.log("Exist: " + exist);

        return exist;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkUserExist: checkUserExist,
    userSignIn: userSignIn,
    userSignUp: userSignUp,
};
