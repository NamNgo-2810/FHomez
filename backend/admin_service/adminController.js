const database = require("./admin.database");

exports.ownerRegisterApproval = async (req, res) => {
    const result = await database.ownerRegisterApproval(req.body.user_id);
    if (result.affectedRows != 1) { return res.status(400)}
    return res.status(200).send("Success");
}
exports.blogApproval = async (req, res) => {
    const result = await database.blogApproval(req.body.motel_id);
    if (result.affectedRows != 1) { return res.status(400)}
    return res.status(200).send("Success");
}
exports.deleteUser = async (req, res) => {
    const result = await database.deleteUser(req.body.user_id);
    return result;
}
exports.acceptOwner = async (req, res) => {
    const result = await database.acceptOwner(req.body.user_id);
    if (result.affectedRows != 1) { return res.status(400)}
    return res.status(200).send("Success");
}
exports.declineOwner = async (req, res) => {
    const result = await database.declineOwner(req.body.user_id);
    if (result.affectedRows != 1) { return res.status(400)}
    return res.status(200).send("Success");
}