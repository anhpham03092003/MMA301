const express = require("express");
const { register, login, checkLoginStatus } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:userId", checkLoginStatus)
module.exports = router;
