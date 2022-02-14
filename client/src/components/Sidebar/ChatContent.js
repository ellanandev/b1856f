import React from "react";
import { Box, Typography } from "@material-ui/core";
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
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFF",
    backgroundColor: "#6091FC",
    padding: "0.2rem 0.5rem",  
    borderRadius: "50px",
    marginRight: "10px",
    },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const unreadMessages = conversation.messages.filter((message) => message.senderId === otherUser.id && !message.readByRecipient ).length;

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Box className={classes.unreadMessagesWrapper}>
         <Typography className={unreadMessages > 0 ? classes.previewUnreadText: classes.previewText}>
          {latestMessageText}
        </Typography>
        {unreadMessages > 0 && (
          <Typography className={classes.unreadMessagesCount}>
            {unreadMessages}
          </Typography>
        )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
