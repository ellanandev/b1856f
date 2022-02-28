import React, { useEffect, useMemo } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect, useSelector } from "react-redux";
import { postMessageRead } from "../../store/utils/thunkCreators";


const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const { postMessageRead } = props;
  useEffect(() => {
    // mark the last received message as read
    const lastMessageReceived = messages.filter((message) => message.senderId === otherUser.id).slice(-1)[0];
    if (lastMessageReceived && !lastMessageReceived.readByRecipient) {
      postMessageRead(lastMessageReceived);
    }
  }, [messages, otherUser, postMessageRead, userId])

  const lastMessageSentReadByRecipent = useSelector(() => messages.filter((message) => message.senderId === userId && message.readByRecipient === true).slice(-1)[0]);

  console.log('Messages', { lastMessageSentReadByRecipent, messages })

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} shouldShowReadCursor={lastMessageSentReadByRecipent?.id === message.id} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessageRead: (message) => {
      dispatch(postMessageRead(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
