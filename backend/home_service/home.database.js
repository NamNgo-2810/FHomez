const connection = require("./database");

async function getAllHome() {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT motel.motel_id, src, title, content, price, category, area, location.locationID, createdAt, typeOfNews, status, category, facilities, dayOfNews
                        FROM motel, location
                        WHERE motel.locationID = location.locationID `,
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
            `SELECT motel.motel_id, src, title, content, price, category, area, location.locationID, createdAt, typeOfNews, status, category, facilities, dayOfNews
        FROM motel, location
        WHERE motel.locationID = location.locationID and motel.motel_id = ${data.motel_id} `,
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
            `INSERT INTO motel(src,title,descr,price,area,locationID,createdAt,type, status)
         VALUES ('${data.src}','${data.title}','${data.descr}','${data.price}','${data.area}','${data.locationID}','${data.createdAt}', '${data.type}', ${data.status});`,
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
        SET src ='${data.src}', title ='${data.title}', descr = '${data.descr}',price = '${data.price}', area ='${data.area}', locationID = '${data.locationID}', createdAt = '${data.createdAt}', type ='${data.type}', status ='${data.status}'
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
