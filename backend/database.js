const mysql = require("mysql");
const mongoose = require("mongoose");
const config = require("./config");

mongoDBConnect();
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

async function mongoDBConnect() {
    try {
        mongoose.connect(
            config.mongo.URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => {
                console.log("MongoDB connected success");
            }
        );
    } catch (error) {
        console.log(error);
    }
}
