const express = require("express");
const {
  sendFriendRequest,
  acceptFriendRequest,
  showFriendRequests,
  getFriends,
  sentFriendRequests,
  findFriend
} = require("../controllers/friendController");
const router = express.Router();

router.post("/friend-request", sendFriendRequest);
router.get("/friend-request/:userId", showFriendRequests);
router.post("/friend-request/accept", acceptFriendRequest);
router.get("/accepted-friends/:userId", getFriends);
router.get("/sent-friend-requests/:userId", sentFriendRequests);
router.get("/find-friend/:userId", findFriend);
module.exports = router;
