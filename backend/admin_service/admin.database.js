const connection = require("./database");

async function ownerRegisterApproval(user_id) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user SET role = 'owner' WHERE user_id = '${user_id}'`, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        return result;
    }).catch(error => console.log(error));
}

async function deleteUser(user_id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM user WHERE user_id = '${data.user_id}'`, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        return result;
    }).catch(error => console.log(error));
}
async function blogApproval(motel_id){
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE motel SET status = 1 WHERE motel_id = '${motel_id}'`, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    }).then((result) => {
        return result;
    }).catch(error => console.log(error));
}

module.exports = {
    deleteUser: deleteUser,
    blogApproval: blogApproval,
    ownerRegisterApproval: ownerRegisterApproval,
};
