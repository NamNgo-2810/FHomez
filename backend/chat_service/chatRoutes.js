const express = require("express");
const router = express.Router();
const controller = require("./chatController");

router.post("/conversation/create", controller.createNewConversation);
router.get("/conversation/", controller.getConversationOfUser);
router.post("/message/send", controller.sendMessage);
router.get("/message/", controller.getMessages);

module.exports = router;
