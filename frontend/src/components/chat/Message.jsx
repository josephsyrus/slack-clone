import React from "react";

const Message = ({ message }) => {
  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "...";
  const initials = message.userId
    ? message.userId.substring(0, 2).toUpperCase()
    : "??";

  return (
    <div className="message-item">
      <div className="message-avatar">{initials}</div>
      <div className="message-content">
        <div className="message-meta">
          <span className="message-username">{message.userId}</span>
          <span className="message-timestamp">{formattedTime}</span>
        </div>
        <p className="message-text">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
