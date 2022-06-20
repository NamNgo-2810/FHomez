const express = require("express");
const router = express.Router();
const controller = require("./adminController");
const middleware = require(".middleware/admin");

router.delete("/user", middleware.isAdmin, controller.deleteUser);
router.post("/blogApproval", middleware.isAdmin, controller.blogApproval);
router.post(
    "/ownerRegisterApproval",
    middleware.isAdmin,
    controller.ownerRegisterApproval
);

module.exports = router;
