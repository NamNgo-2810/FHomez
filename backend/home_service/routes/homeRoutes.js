const express = require("express");
const router = express.Router();
const controller = require("../controller/homeController");
const middleware = require("../middleware/auth");

router.post("/", middleware.isAuth, controller.addHome);
router.put("/", middleware.isAuth, controller.updateHome);
router.delete("/", middleware.isAuth, controller.deleteHome);
router.get("/search", controller.search);
router.get("/get_all_home", controller.getAllHome);
router.get("/get_by_home_id", controller.getByHomeID);
router.post("/review", middleware.isAuth, controller.addReview);
router.get("/getCommentByMotel", controller.getCommentByMotel);
router.delete("/deleteComment", middleware.isAuth, controller.deleteComment);

module.exports = router;
