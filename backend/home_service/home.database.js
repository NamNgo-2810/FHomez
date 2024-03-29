const connection = require("./database");

async function getAllHome() {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT motel_id, src, title, content, price, category, area, createdAt, typeOfNews, status, category, facilities, dayOfNews, latitude, longitude, address, street, district, user_id
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
    console.log(data.motel_id);
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT *
             FROM motel WHERE motel_id = ${data.motel_id} `,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        //console.log(result);
        return result;
    });
}

async function getByUserID(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT motel_id, src, title, content, price, category, area, createdAt, typeOfNews, status, category, facilities, dayOfNews, latitude, longitude, address, street, district, user_id
             FROM motel WHERE motel.user_id = ${data.user_id} `,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length == 0) {
            return [];
        }
        //console.log(result);
        return result;
    });
}

async function getByHomeStatus0(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT motel_id, src, title, content, price, category, area, createdAt, typeOfNews, status, category, facilities, dayOfNews, latitude, longitude, address, street, district, user_id
             FROM motel WHERE motel.status = '0' `,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        //console.log(result);
        return result;
    });
}

async function addHome(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO motel( src, title, content, price, area, createdAt, typeOfNews, status, category, facilities, dayOfNews, latitude, longitude, street, district, user_id,address)
             VALUES ('${data.src}','${data.title}','${data.content}','${data.price}', '${data.area}','${data.createdAt}','${data.typeOfNews}', ${data.status}, '${data.category}', '${data.facilities}', '${data.dayOfNews}', ${data.latitude}, ${data.longitude}, '${data.street}', '${data.district}', '${data.user_id}', '${data.address}');`,
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
    console.log(keys);
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM motel 
            WHERE price >= ${minCost ? minCost : 0} 
            AND area >= ${minArea ? minArea : 0}
            ${maxCost ? ` AND price <= ${maxCost} ` : ""}
            ${maxArea ? ` AND area <= ${maxArea}` : ""}`;
        connection.query(query, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        return result;
    });
}

async function getCommentByMotel(motel_id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM review WHERE motel_id = ${motel_id}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    }).then((result) => {
        if (result.length == 0) {
            return [];
        }
        return result;
    });
}

async function addReview(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO review (motel_id, user_id, comment, rate)
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

async function getPrice() {
    return new Promise((resolve, reject) => {
        connection.query(`select * from price`, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        if (result.length == 0) {
            return null;
        }
        console.log(result);

        // hotPrice = JSON.parse(result.hotPrice);
        // console.log(`${hotPrice}`)

        return result;
    });
}
async function ownerVerify(user_id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE user SET isWaitingForVerify = 1 WHERE user_id = '${user_id}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    })
        .then((result) => {
            return result;
        })
        .catch((error) => console.log(error));
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
    getPrice: getPrice,
    ownerVerify: ownerVerify,
    getByHomeStatus0: getByHomeStatus0,
    getByUserID: getByUserID,
};
