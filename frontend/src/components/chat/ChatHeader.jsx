import React from "react";
import { HashIcon } from "../ui/Icons";

const ChatHeader = ({ channel, workspace }) => {
  return (
    <div className="chat-header">
      {workspace ? (
        channel ? (
          <>
            <HashIcon />
            <h2>{channel.channel_name}</h2>
          </>
        ) : (
          <h2>Select a channel</h2>
        )
      ) : null}
    </div>
  );
};

export default ChatHeader;
