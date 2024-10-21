const express = require("express");
const multer = require("multer");
const { sendMessage } = require("../controllers/messageController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/messages", upload.single("imageFile"), sendMessage);

module.exports = router;
