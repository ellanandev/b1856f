const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationParticipant = require("./conversation_participant");

// associations

User.belongsToMany(Conversation, { through: 'conversation_participant' });
Conversation.belongsToMany(User, { through: 'conversation_participant' });
ConversationParticipant.belongsTo(Message, {
  as: 'lastReadMessage',
});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
