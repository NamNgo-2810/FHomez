const database = require("../../services/review.database");

exports.getCommentByMotel = async (req, res) => {
    try {
        const result = await database.getCommentByMotel(motelid);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(400).send("This motel hasn't been reviewed yet");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.addReview = async (req, res) => {
    try {
        const result = await database.addReview();
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
        const result = await database.deleteComment();
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(400).send("Success!");
        }
    } catch (error) {
        console.log(error);
    }
};
