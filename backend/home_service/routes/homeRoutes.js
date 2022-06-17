const express = require("express");
const router = express.Router();
const controller = require("../controller/homeController");
const middleware = require("../../auth_service/middleware/auth");

router.post("/add_home", controller.addHome);
router.put("/update_home", controller.updateHome);
router.delete("/delete_home", controller.deleteHome);
router.post("/rate_home", middleware.isAuth, controller.rateHome);
router.get("/search", controller.search);
router.get("/get_all_home", middleware.isAuth, controller.getAllHome);
router.get("/get_by_home_id", controller.getByHomeID);

module.exports = router;
