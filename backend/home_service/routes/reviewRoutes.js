const express = require("express");
const router = express.Router();
const controller = require("../controller/reviewController");
const middleware = require("../middleware/auth");

router.post("/review", middleware.isAuth, controller.addReview);
router.get("/getCommentByMotel", controller.getCommentByMotel);
router.delete("/deleteComment",middleware.isAuth, controller.deleteComment);