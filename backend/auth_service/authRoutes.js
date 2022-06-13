const express = require("express");
const router = express.Router();
const controller = require("./authController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/verify", controller.OTPverifier);
router.get("/get_user_by_id", controller.getUserById);

module.exports = router;
