const database = require("../services/home.database");

exports.getAllHome = async (req, res) => {
    const result = await database.getAllHome();
    return res.status(200).json(result);
};

exports.getByHomeID = async (req, res) => {
    const result = await database.getByHomeID(req.body);
    return res.status(200).json(result);
};

exports.addHome = async (req, res) => {
    // TO DO: Insert home's info to database
    const result = await database.addHome(req.body);
    return res.status(200).json(result);
};

exports.updateHome = async (req, res) => {
    // TO DO: Update home's info
    const result = await database.updateHome(req.body);
    return res.status(200).json(result);
};

exports.deleteHome = async (req, res) => {
    // TO DO: Delete home from database
    const result = await database.deleteHome(req.body);
    return res.status(200).json(result);
};

exports.search = async (req, res) => {
    // TO DO: Query all the records that contains information user entered,
    // and then sort by percentage of matching criterias
    const { minCost, maxCost, minArea, maxArea, latitude, longtitude } =
        req.query;

    return res.status(200).send("OK");
};
