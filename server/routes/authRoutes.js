const express = require("express");
const { register, login, checkLoginStatus, checkInfomation, changePassword, editProfile, getProfile } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:userId", checkLoginStatus)
router.get("/users/:userId", checkInfomation),
router.put("/:userId/change-password", changePassword),
router.put("/:userId/edit-profile", editProfile),
router.get("/:userId/profile", getProfile)
module.exports = router;
