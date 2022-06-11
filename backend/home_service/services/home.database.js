const connection = require("../database");

async function getAllHome() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM motel, location WHERE motel.locationID = location.locationID`, (error, result) => {
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

async function getByHomeID(data) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM motel, location WHERE motel_id = ${data.motel_id} and motel.locationID = location.locationID`, (error, result) => {
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
        connection.query(`INSERT INTO motel(src,title,descr,price,area,locationID,createdAt,type)
         VALUES ('${data.src}','${data.title}','${data.descr}','${data.price}','${data.area}','${data.locationID}','${data.createdAt}', '${data.type}');`, (error, result) => {
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

async function deleteHome(data) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM motel WHERE motel_id = ${data.motel_id}`, (error, result) => {
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

async function updateHome(data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE motel 
        SET src ='${data.src}', title ='${data.title}', descr = '${data.descr}',price = '${data.price}', area ='${data.area}', locationID = '${data.locationID}', createdAt = '${data.createdAt}', type ='${data.type}'
        WHERE motel_id = ${data.motel_id}`, (error, result) => {
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
    deleteHome: deleteHome,
    getByHomeID: getByHomeID,
    updateHome: updateHome,
};