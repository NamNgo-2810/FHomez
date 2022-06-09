const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const database = require("../services/user.database");

router.get("/users/:id", middleware.isAuth, async (req, res) => {
    try {
        const user = database.getUser(req.body.id);
        res.send(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;