// frontend/src/components/layout/ChannelSidebar.jsx

import React, { useState } from "react";
import { HashIcon, UserIcon, AddUserIcon, ChevronDownIcon } from "../ui/Icons";
import UserPopup from "../ui/UserPopup";
import WorkspaceSettingsMenu from "../ui/WorkspaceSettingsMenu";

const ChannelSidebar = ({
  workspace,
  onSelectChannel,
  onCreateChannel,
  onUserClick,
  currentChannelId,
  user,
  isUserPopupVisible,
  onLogout,
  onInviteClick,
  onDeleteWorkspace,
  onRenameWorkspace, // Add new prop
}) => {
  const [newChannelName, setNewChannelName] = useState("");
  const [isSettingsMenuVisible, setSettingsMenuVisible] = useState(false);

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (newChannelName.trim()) {
      onCreateChannel(newChannelName.trim());
      setNewChannelName("");
    }
  };

  if (!workspace) return null;

  const handleDeleteClick = () => {
    setSettingsMenuVisible(false);
    onDeleteWorkspace();
  };

  const handleRenameClick = () => {
    setSettingsMenuVisible(false);
    onRenameWorkspace();
  };

  return (
    <div className="channel-sidebar">
      {isUserPopupVisible && <UserPopup user={user} onLogout={onLogout} />}
      <div className="sidebar-header">
        <div
          className="sidebar-header-clickable"
          onClick={() => setSettingsMenuVisible(!isSettingsMenuVisible)}
        >
          <h1>{workspace.name}</h1>
          <ChevronDownIcon />
        </div>
        <button
          className="invite-button"
          title="Invite people"
          onClick={onInviteClick}
        >
          <AddUserIcon />
        </button>
      </div>
      {isSettingsMenuVisible && (
        <WorkspaceSettingsMenu
          onRenameClick={handleRenameClick}
          onDeleteClick={handleDeleteClick}
        />
      )}
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
