const express = require("express");
const router = express.Router();
const controller = require("./adminController");
const middleware = require("../auth_service/middleware/auth");

router.delete('/user',middleware.isAuth,controller.deleteUser);
router.post('/blogApproval',middleware.isAuth,controller.blogApproval);
router.post('/ownerRegisterApproval', middleware.isAuth, controller.ownerRegisterApproval);

module.exports = router;