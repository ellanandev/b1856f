const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/:messageId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { messageId } = req.params;
    const { readByRecipient } = req.body;
    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.sendStatus(404);
    }

    const conversation = await Conversation.findByPk(
      message.conversationId
    );

    if (![conversation.user1Id, conversation.user2Id].includes(req.user.id)) {
      // user is not part of conversation
      return res.sendStatus(403);
    }
    if (message.senderId === req.user.id) {
      // user is sender, so can't mark as read
      return res.sendStatus(403);
    }

    const updatedMessage = await message.update({ readByRecipient });
    res.json(updatedMessage);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
