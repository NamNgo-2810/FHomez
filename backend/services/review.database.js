const connection = require("../database");

async function getCommentByMotel(motelid) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT comment FROM review WHERE motelid = ${motelid}`, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        return result;
    });
}

async function addReview(data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO review(motelid, userid, comment, rate)
         VALUES ('${data.motelid}','${data.userid}','${data.comment}','${data.rate}');`, (error, result) => {
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
    getCommentByMotel: getCommentByMotel,
    addReview: addReview,
};