import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { postMessageRead } from "../../store/utils/thunkCreators";


const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const { postMessageRead } = props;
  useEffect(() => {
    // mark the last received message as read
    const lastMessageReceived = messages.filter((message) => message.senderId === otherUser.id).slice(-1)[0];
    if (lastMessageReceived && !lastMessageReceived.readByRecipient) {
      postMessageRead(lastMessageReceived.id)
    }
  }, [messages, otherUser, postMessageRead, userId])

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessageRead: (messageId) => {
      dispatch(postMessageRead(messageId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
