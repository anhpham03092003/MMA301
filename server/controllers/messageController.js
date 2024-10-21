const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  const { senderId, recipientId, messageType, messageText } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      recipientId,
      messageType,
      message: messageText,
      timestamp: new Date(),
      imageUrl: messageType === "image" ? req.file.path : null,
    });

    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendMessage };
