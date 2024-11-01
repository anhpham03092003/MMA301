const User = require("../models/User");

const sendFriendRequest = async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

const showFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("friendRequests", "name email image")
      .lean();

    const friendRequests = user.friendRequests;

    res.json(friendRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

const acceptFriendRequest = async (req, res) => {
  const { senderId, recipientId } = req.body;

  try {
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    sender.friends.push(recipientId);
    recipient.friends.push(senderId);

    recipient.friendRequests = recipient.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recipientId.toString()
    );

    await sender.save();
    await recipient.save();

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );
    const acceptedFriends = user.friends;
    res.json(acceptedFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sentFriendRequests = async (req, res) => {
  try{
    const {userId} = req.params;
    const user = await User.findById(userId).populate("sentFriendRequests","name email image").lean();

    const sentFriendRequests = user.sentFriendRequests;

    res.json(sentFriendRequests);
  } catch(error){
    console.log("error",error);
    res.status(500).json({ error: "Internal Server" });
  }
};

const findFriend = async (req, res) => {
  try{
    const {userId} = req.params;

    User.findById(userId).populate("friends").then((user) => {
      if(!user){
        return res.status(404).json({message: "User not found"})
      }

      const friendIds = user.friends.map((friend) => friend._id);

      res.status(200).json(friendIds);
    })
  } catch(error){
    console.log("error",error);
    res.status(500).json({message:"internal server error"})
  }
};

module.exports = { sendFriendRequest, acceptFriendRequest, showFriendRequests, getFriends, sentFriendRequests, findFriend };
