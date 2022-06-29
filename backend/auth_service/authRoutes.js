const express = require("express");
const router = express.Router();
const controller = require("./authController");
const middleware = require("./middleware/auth");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/verify", controller.OTPverifier);
router.get("/get_user_by_id/:userId", controller.getUserById);
router.patch("/update_user_info", middleware.isAuth, controller.updateUserInfo);

module.exports = router;
