const connection = require("./database");

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

async function acceptOwner(user_id){
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE user SET isWaitingForVerify = 0 AND role = 'owner' WHERE user_id = '${user_id}'`, (error, result)=>{
            if (error) reject(error);
            resolve(result);
        });
    }).then((result)=>{
        return result;
    }).catch(error => console.log(error));
}

async function declineOwner(user_id){
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE user SET isWaitingForVerify = 0 WHERE user_id = '${user_id}'`, (error, result)=>{
            if (error) reject(error);
            resolve(result);
        });
    }).then((result)=>{
        return result;
    }).catch(error => console.log(error));
}
async function getOwnerIsWaiting(){
    return new Promise((resolve, reject) =>{
        connection.query(`SELLECT * FROM user WHERE isWaitingForVerify = 1`, (error, result)=>{
            if (error) reject(error);
            resolve(result);
        });
    }).then((result)=>{
        return result;
    }).catch(error => console.log(error));
}


module.exports = {
    deleteUser: deleteUser,
    blogApproval: blogApproval,
    acceptOwner: acceptOwner,
    declineOwner: declineOwner,
    getOwnerIsWaiting: getOwnerIsWaiting,
};
