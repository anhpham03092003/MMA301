const express = require("express");
const {
  sendFriendRequest,
  acceptFriendRequest,
  showFriendRequests,
} = require("../controllers/friendController");
const router = express.Router();

router.post("/friend-request", sendFriendRequest);
router.get("/friend-request/:userId", showFriendRequests);
router.post("/friend-request/accept", acceptFriendRequest);

module.exports = router;
