const express = require("express");
const router = express.Router();
const controller = require("../controller/homeController");
const middleware = require("../middleware/auth");

router.post("/add_home", middleware.isAuth, controller.addHome);
router.post("/update_home", middleware.isAuth, controller.updateHome);
router.post("/delete_home", middleware.isAuth, controller.deleteHome);
router.post("/rate_home", middleware.isAuth, controller.rateHome);
router.get("/search", controller.search);
router.get("/get_all_home", controller.getAllHome);

module.exports = router;
