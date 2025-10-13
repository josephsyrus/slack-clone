import React from "react";
import { HashIcon } from "../ui/Icons";

const ChatHeader = ({ channel }) => {
  return (
    <div className="chat-header">
      {channel ? (
        <>
          <HashIcon />
          <h2>{channel.name}</h2>
        </>
      ) : (
        <h2>Select a channel</h2>
      )}
    </div>
  );
};

export default ChatHeader;
