const mssql = require("mssql");
const config = require("../config");

async function getUser(userId) {
    try {
        const connection = await mssql.connect(config.db);
        const results = await connection
            .request()
            .input("@userId", mssql.BigInt, userId)
            .query("SELECT * FROM Users where Id = @userId");

        return results;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUser: getUser,
};
