const { sort } = require("./helpers/topsis.helper");
const database = require("./home.database");

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
    if (Object.keys(req.query) == 0) {
        return this.getAllHome(req, res);
    }

    const result = await database.searchHome(req.query);

    if (result.length == 0) {
        return res
            .status(200)
            .send("Can't find any home matching your requirements!");
    }

    const { latitude, longtitude } = req.query;

    // const weights = {};
    // result = sort({ latitude, longtitude }, result, weights);

    return res.status(200).json(result);
};

exports.getCommentByMotel = async (req, res) => {
    try {
        const result = await database.getCommentByMotel(req.body.motel_id);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).send("This motel hasn't been reviewed yet");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.addReview = async (req, res) => {
    try {
        const result = await database.addReview(req.body.data);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(400).send("Success!");
        }
    } catch (error) {
        console.log(error);
    }
};
exports.deleteComment = async (req, res) => {
    try {
        const result = await database.deleteComment(req.body.review_id);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(400).send("Success!");
        }
    } catch (error) {
        console.log(error);
    }
};