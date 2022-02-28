const { Op } = require("sequelize");
const db = require("../db");

const ConversationParticipant = db.define("conversation_participant", {});

module.exports = ConversationParticipant;
