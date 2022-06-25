const connection = require("./database");

async function getAllHome() {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT motel_id, src, title, content, price, category, area, createdAt, typeOfNews, status, category, facilities, dayOfNews, latitude, longitude, street, district
                        FROM motel`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
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
        connection.query(
            `SELECT motel_id, src, title, content, price, category, area, createdAt, typeOfNews, status, category, facilities, dayOfNews, latitude, longitude, street, district
             FROM motel WHERE motel.motel_id = ${data.motel_id} `,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
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
        connection.query(
            `INSERT INTO motel( src, title, content, price, area, createdAt, typeOfNews, status, category, facilities, dayOfNews, latitude, longitude, street, district)
             VALUES ('${data.src}','${data.title}','${data.content}','${data.price}', '${data.area}','${data.createdAt}','${data.typeOfNews}', ${data.status}, '${data.category}', '${data.facilities}', '${data.dayOfNews}', ${data.latitude}, ${data.longitude}, '${data.street}', '${data.district}');`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
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
        connection.query(
            `DELETE FROM motel WHERE motel_id = ${data.motel_id}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
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
        connection.query(
            `UPDATE motel 
            SET src ='${data.src}', title ='${data.title}', content = '${data.content}',price = '${data.price}', area ='${data.area}', createdAt = '${data.createdAt}', typeofNews ='${data.typeofNews}', status = ${data.status}, category = '${data.category}', facilities = '${data.facilities}', dayOfNews ='${data.dayOfNews}', latitude = ${data.latitude}, longitude = ${data.longitude}, street = '${data.street}', district ='${data.district}'
            WHERE motel_id = ${data.motel_id}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        // console.log(result);
        return result;
    });
}

async function searchHome(keys) {
    const { minCost, maxCost, minArea, maxArea } = keys;

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM motel 
            WHERE 'cost' >= ${minCost ? minCost : 0} 
            AND 'area' >= ${minArea ? minArea : 0}
            ${maxCost ? ` AND 'cost' <= ${maxCost} ` : ""}
            ${maxArea ? ` AND 'area' <= ${maxArea}` : ""}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        return result;
    });
}

async function getCommentByMotel(motel_id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT comment FROM review WHERE motel_id = ${motel_id}`,
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

async function addReview(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO review (motel_id, user_id, comment, rate))
         VALUES ('${data.motel_id}','${data.user_id}','${data.comment}','${data.rate}');`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
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
        connection.query(
            `DELETE FROM review WHERE review_id = '${data.review_id}'`,
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
    getAllHome: getAllHome,
    addHome: addHome,
    deleteHome: deleteHome,
    getByHomeID: getByHomeID,
    updateHome: updateHome,
    searchHome: searchHome,
    getCommentByMotel: getCommentByMotel,
    addReview: addReview,
    deleteComment: deleteComment,
};
