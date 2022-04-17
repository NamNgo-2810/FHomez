const express = require("express");
const router = express.Router();
const database = require("../services/database");

router.route("/users/:id").get(async (req, res) => {
    try {
        const user = database.getUser(req.params.id);
        res.send(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
