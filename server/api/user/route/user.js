const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/me", userController.updateFavorite);
router.post("/favorite", userController.getFavorite);
router.post("/notme", userController.deleteFavorite);

module.exports = router;
