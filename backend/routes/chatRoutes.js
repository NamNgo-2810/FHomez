const express = require("express");
const router = express.Router();
const controller = require("../controller/chatController");

router.post("/conversation", controller.createNewConversation);
router.post("/login", controller.login);
router.post("/send", controller.OTPsender);
router.post("/verify", controller.OTPverifier);

module.exports = router;
