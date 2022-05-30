const connection = require("../database");

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
        // console.log(result);
        return result;
    });
}

async function addHome(data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO motel(src,title,descr,price,area,location,createdAt)
         VALUES ('${data.src}','${data.title}','${data.descr}','${data.price}','${data.area}','${data.location}','${data.createdAt}');`, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        // console.log(result);
        return result;
    });
}

module.exports = {
    getAllHome: getAllHome,
    addHome: addHome,
};
