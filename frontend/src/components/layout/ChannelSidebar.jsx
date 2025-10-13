import React, { useState } from "react";
import { HashIcon, UserIcon } from "../ui/Icons";
import UserPopup from "../ui/UserPopup";

const ChannelSidebar = ({
  workspace,
  onSelectChannel,
  onCreateChannel,
  onUserClick,
  currentChannelId,
  user,
  isUserPopupVisible,
  onLogout,
}) => {
  const [newChannelName, setNewChannelName] = useState("");

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (newChannelName.trim()) {
      onCreateChannel(newChannelName.trim());
      setNewChannelName("");
    }
  };

  if (!workspace) return null;

  return (
    <div className="channel-sidebar">
      {isUserPopupVisible && <UserPopup user={user} onLogout={onLogout} />}
      <div className="sidebar-header">
        <h1>{workspace.name}</h1>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h2>CHANNELS</h2>
          <ul className="channel-list">
            {workspace.channels.map((channel) => (
              <li
                key={channel.id}
                className={`channel-item ${
                  currentChannelId === channel.id ? "active" : ""
                }`}
                onClick={() => onSelectChannel(channel)}
              >
                <HashIcon />
                <span>{channel.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="create-channel-section">
          <form onSubmit={handleCreateChannel}>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="Create a channel"
              className="create-channel-input"
            />
          </form>
        </div>
      </div>
      <div className="sidebar-footer" onClick={onUserClick}>
        <UserIcon />
        <span className="user-id" title={user?.uid}>
          {user?.uid}
        </span>
      </div>
    </div>
  );
};

export default ChannelSidebar;
