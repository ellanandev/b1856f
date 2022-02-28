import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  container: {
    width: "100%",
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewUnreadText: {
    fontSize: 12,
    letterSpacing: -0.17,
    color: "#000000",
    fontWeight: "bold",
  },
  unreadMessagesWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unreadMessagesCount: {
    padding: "0.2rem 0.6rem",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const unreadMessageCount = useSelector(() => {
    const messagesFromOtherPerson = conversation.messages.filter((message) => message.senderId === otherUser.id)
    const unreadMessages = messagesFromOtherPerson.slice(
      messagesFromOtherPerson.findLastIndex(
        (message) => message.readByRecipient === true
      ) + 1
    );
    console.log('useSelector', { unreadMessages, messagesFromOtherPerson })
    return unreadMessages.length
  });

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Box className={classes.unreadMessagesWrapper}>
          <Typography className={unreadMessageCount > 0 ? classes.previewUnreadText : classes.previewText}>
            {latestMessageText}
          </Typography>
          {unreadMessageCount > 0 && (
            <Badge badgeContent={unreadMessageCount} color="primary" anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }} className={classes.unreadMessagesCount} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
