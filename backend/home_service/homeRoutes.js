const express = require("express");
const router = express.Router();
const controller = require("./homeController");
const middleware = require("./middleware/auth");

router.post("/add_home", middleware.isAuth, controller.addHome);
router.put("/update_home", middleware.isAuth, controller.updateHome);
router.delete("/delete_home", middleware.isAuth, controller.deleteHome);
router.get("/search", controller.search);
router.get("/get_all_home", controller.getAllHome);
router.get("/get_by_home_id", controller.getByHomeID);
router.post("/review", middleware.isAuth, controller.addReview);
router.get("/getCommentByMotel", controller.getCommentByMotel);
router.get("/price", controller.getPrice);
router.delete("/deleteComment", middleware.isAuth, controller.deleteComment);

module.exports = router;
