const express = require("express");
const router = express.Router();




const userController = require("../controller/userController");
const authMiddlewere = require("../meddlewere/authMiddlewere");

router.post("/register", userController.saveRegister);
router.post("/login", userController.loginUser);
router.post(
  "/get-user-info-by-id",
  authMiddlewere,
  userController.getUserInfoById
);

module.exports = router;
