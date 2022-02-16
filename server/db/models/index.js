const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationParticipant = require("./conversation_participant");

// associations

User.hasMany(Conversation);
Conversation.belongsToMany(User, {through: 'conversation_participant'});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
