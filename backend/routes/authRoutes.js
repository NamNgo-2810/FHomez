const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/send", controller.OTPsender);
router.post("/verify", controller.OTPverifier);

module.exports = router;
