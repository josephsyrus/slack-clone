import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { SendIcon } from "../ui/Icons";

const Chat = ({ channel, messages, onSendMessage, user }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader channel={channel} />
      <div className="messages-area">
        {channel ? (
          messages.length > 0 ? (
            <div>
              {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="placeholder-container">
              <p className="placeholder-text">
                Be the first to say something in #{channel.name}!
              </p>
            </div>
          )
        ) : (
          <div className="placeholder-container">
            <p className="placeholder-text">
              Select a channel to start chatting or create a new one.
            </p>
          </div>
        )}
      </div>
      {channel && user && (
        <div className="chat-input-area">
          <form onSubmit={handleSendMessage} className="chat-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${channel.name}`}
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
