const connection = require("../database");

async function getCommentByMotel(motel_id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT comment FROM review WHERE motel_id = ${motel_id}`, (error, result) => {
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
        connection.query(`INSERT INTO review (motel_id, user_id, comment, rate))
         VALUES ('${data.motel_id}','${data.user_id}','${data.comment}','${data.rate}');`, (error, result) => {
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
async function deleteComment(review_id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM review WHERE review_id = '${data.review_id}'`, (error, result) => {
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

module.exports = {
    getCommentByMotel: getCommentByMotel,
    addReview: addReview,
    deleteComment: deleteComment,
};

