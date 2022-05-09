const bcrypt = require("bcryptjs");
const connection = require("../database");

async function userSignIn(phoneNumber, password) {
    return new Promise(function (resolve, reject) {
        connection.query(
            "SELECT * FROM test_user WHERE phoneNumber = ?",
            [phoneNumber],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length == 0) {
            return {
                status: 401,
                message: "Invalid user",
            };
        }
        const isPasswordValid = bcrypt.compareSync(
            password,
            result[0].password
        );
        if (!isPasswordValid) {
            return {
                status: 401,
                message: "Wrong password",
            };
        }
        return {
            status: 200,
            message: "Login success",
            body: result[0],
        };
    });
}

async function userSignUp(phoneNumber, password) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `INSERT INTO test_user (phoneNumber, password) VALUES ('${phoneNumber}', '${password}')`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        return true;
    });
}

async function updateRefreshToken(phoneNumber, refreshToken) {
    return new Promise(() => {
        console.log("Refresh token adding...");
        connection.query(
            `UPDATE test_user
            SET refreshToken = '${refreshToken}'
            WHERE phoneNumber = ${phoneNumber}`,
            (error, result) => {
                if (error) return false;
                console.log(result);
            }
        );
    }).then(() => {
        return true;
    });
}

async function getUserByPhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM test_user WHERE phoneNumber = ${phoneNumber}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        return result;
    });
}

module.exports = {
    userSignIn: userSignIn,
    userSignUp: userSignUp,
    getUserByPhoneNumber: getUserByPhoneNumber,
    updateRefreshToken: updateRefreshToken,
};
