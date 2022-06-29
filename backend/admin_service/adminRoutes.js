const express = require("express");
const router = express.Router();
const controller = require("./adminController");
const middleware = require("./middleware/admin");

router.delete("/user", middleware.isAdmin, controller.deleteUser);
router.post("/blogApproval", middleware.isAdmin, controller.blogApproval);
router.post("/acceptUser", middleware.isAdmin, controller.acceptOwner);
router.post("/declineUser", middleware.isAdmin, controller.declineOwner);
router.get("/getOwnerIsWaiting", middleware.isAdmin, controller.getOwnerIsWaiting);

module.exports = router;
