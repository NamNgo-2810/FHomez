const database = require("../services/home.database");

exports.getAllHome = async (req, res) => {
    const result = await database.getAllHome();
};

exports.addHome = async (req, res) => {
    // TO DO: Insert home's info to database
};

exports.updateHome = async (req, res) => {
    // TO DO: Update home's info
};

exports.deleteHome = async (req, res) => {
    // TO DO: Delete home from database
};

exports.rateHome = async (req, res) => {
    // TO DO: Update rating to home from specific user
};

exports.search = async (req, res) => {
    // TO DO: Query all the records that contains information user entered,
    // and then sort by percentage of matching criterias
};
