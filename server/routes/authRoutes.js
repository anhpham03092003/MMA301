const express = require("express");
const { register, login, checkLoginStatus, checkInfomation } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:userId", checkLoginStatus)
router.get("/users/:userId", checkInfomation)
module.exports = router;
