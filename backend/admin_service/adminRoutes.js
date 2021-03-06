const express = require("express");
const router = express.Router();
const controller = require("./adminController");
const middleware = require("./middleware/admin");

router.delete("/user", middleware.isAdmin, controller.deleteUser);
router.post("/blogApproval", middleware.isAdmin, controller.blogApproval);
router.post("/blogReject", middleware.isAdmin, controller.blogApproval);
router.post("/acceptOwner", middleware.isAdmin, controller.acceptOwner);
router.post("/declineOwner", middleware.isAdmin, controller.declineOwner);
router.get("/getOwnerIsWaiting", middleware.isAdmin, controller.getOwnerIsWaiting);

module.exports = router;
