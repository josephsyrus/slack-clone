// frontend/src/App.jsx

import React, { useState } from "react";
import { initialData } from "./data/mockData";
import AuthPage from "./components/auth/AuthPage";
import WorkspaceSidebar from "./components/layout/WorkspaceSidebar";
import ChannelSidebar from "./components/layout/ChannelSidebar";
import Chat from "./components/chat/Chat";
import AddWorkspacePopup from "./components/ui/AddWorkspacePopup";
import InvitePeoplePopup from "./components/ui/InvitePeoplePopup";
import AddWorkspaceChoicePopup from "./components/ui/AddWorkspaceChoicePopup";
import JoinWorkspacePopup from "./components/ui/JoinWorkspacePopup";
import ConfirmDeletePopup from "./components/ui/ConfirmDeletePopup";
import RenameWorkspacePopup from "./components/ui/RenameWorkspacePopup"; // Import new popup

function App() {
  // --- App State ---
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState(null);
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const [isInvitePopupVisible, setInvitePopupVisible] = useState(false);
  const [isAddWorkspaceChoiceVisible, setAddWorkspaceChoiceVisible] =
    useState(false);
  const [isAddWorkspacePopupVisible, setAddWorkspacePopupVisible] =
    useState(false);
  const [isJoinWorkspacePopupVisible, setJoinWorkspacePopupVisible] =
    useState(false);
  const [isConfirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [isRenameWorkspaceVisible, setRenameWorkspaceVisible] = useState(false); // New state

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(
    Object.keys(initialData)[0]
  );
  const [currentChannelId, setCurrentChannelId] = useState(
    initialData[Object.keys(initialData)[0]].channels[0].id
  );

  // --- Handlers ---
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setUserPopupVisible(false);
  };

  const handleSelectWorkspace = (workspaceId) => {
    setCurrentWorkspaceId(workspaceId);
    const firstChannelId = data[workspaceId].channels[0]?.id;
    setCurrentChannelId(firstChannelId);
  };

  const handleSelectChannel = (channel) => {
    setCurrentChannelId(channel.id);
  };

  const handleCreateWorkspace = (name, initial) => {
    const newWorkspaceId = `ws${Date.now()}`;
    const newChannelId = `c${Date.now()}`;
    const newWorkspace = {
      id: newWorkspaceId,
      name,
      initial,
      channels: [{ id: newChannelId, name: "general" }],
      messages: { [newChannelId]: [] },
    };
    setData((prevData) => ({ ...prevData, [newWorkspaceId]: newWorkspace }));
    setCurrentWorkspaceId(newWorkspaceId);
    setCurrentChannelId(newChannelId);
  };

  const handleJoinWorkspace = (workspaceId) => {
    console.log(
      `User ${user.uid} attempting to join workspace: ${workspaceId}`
    );
    alert(
      `Join functionality is not yet implemented. \nAttempted to join: ${workspaceId}`
    );
  };

  const handleDeleteWorkspace = () => {
    const workspaceIdToDelete = currentWorkspaceId;
    if (Object.keys(data).length <= 1) {
      alert("You cannot delete the last workspace.");
      setConfirmDeleteVisible(false);
      return;
    }
    const newData = { ...data };
    delete newData[workspaceIdToDelete];
    setData(newData);
    const remainingWorkspaceIds = Object.keys(newData);
    const newCurrentWorkspaceId = remainingWorkspaceIds[0];
    setCurrentWorkspaceId(newCurrentWorkspaceId);
    const firstChannelId = newData[newCurrentWorkspaceId].channels[0]?.id;
    setCurrentChannelId(firstChannelId);
    setConfirmDeleteVisible(false);
  };

  // --- NEW: Rename Workspace Handler ---
  const handleRenameWorkspace = (newName) => {
    setData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData[currentWorkspaceId].name = newName;
      // Also update the initial to match the new name
      newData[currentWorkspaceId].initial = newName
        .substring(0, 1)
        .toUpperCase();
      return newData;
    });
    setRenameWorkspaceVisible(false);
  };

  const handleCreateChannel = (channelName) => {
    const newChannel = { id: `c${Date.now()}`, name: channelName };
    setData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData[currentWorkspaceId].channels.push(newChannel);
      newData[currentWorkspaceId].messages[newChannel.id] = [];
      return newData;
    });
    setCurrentChannelId(newChannel.id);
  };

  const handleSendMessage = (messageText) => {
    if (!user || !currentChannelId) return;
    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };
    setData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const messages =
        newData[currentWorkspaceId].messages[currentChannelId] || [];
      messages.push(newMessage);
      newData[currentWorkspaceId].messages[currentChannelId] = messages;
      return newData;
    });
  };

  if (!user) return <AuthPage onLogin={handleLogin} />;

  const currentWorkspace = data[currentWorkspaceId];
  const currentChannel = currentWorkspace?.channels.find(
    (c) => c.id === currentChannelId
  );
  const messagesForCurrentChannel =
    currentWorkspace?.messages[currentChannelId] || [];

  return (
    <div className="app-container">
      <WorkspaceSidebar
        data={data}
        currentWorkspaceId={currentWorkspaceId}
        onSelectWorkspace={handleSelectWorkspace}
        onAddWorkspace={() => setAddWorkspaceChoiceVisible(true)}
      />
      <ChannelSidebar
        workspace={currentWorkspace}
        onSelectChannel={handleSelectChannel}
        onCreateChannel={handleCreateChannel}
        currentChannelId={currentChannelId}
        user={user}
        onUserClick={() => setUserPopupVisible(!isUserPopupVisible)}
        isUserPopupVisible={isUserPopupVisible}
        onLogout={handleLogout}
        onInviteClick={() => setInvitePopupVisible(true)}
        onDeleteWorkspace={() => setConfirmDeleteVisible(true)}
        onRenameWorkspace={() => setRenameWorkspaceVisible(true)} // Pass handler
      />
      <Chat
        channel={currentChannel}
        messages={messagesForCurrentChannel}
        onSendMessage={handleSendMessage}
        user={user}
      />

      {/* --- POPUPS --- */}
      {isAddWorkspaceChoiceVisible && (
        <AddWorkspaceChoicePopup
          onClose={() => setAddWorkspaceChoiceVisible(false)}
          onChooseCreate={() => {
            setAddWorkspaceChoiceVisible(false);
            setAddWorkspacePopupVisible(true);
          }}
          onChooseJoin={() => {
            setAddWorkspaceChoiceVisible(false);
            setJoinWorkspacePopupVisible(true);
          }}
        />
      )}
      {isAddWorkspacePopupVisible && (
        <AddWorkspacePopup
          onClose={() => setAddWorkspacePopupVisible(false)}
          onCreate={handleCreateWorkspace}
        />
      )}
      {isJoinWorkspacePopupVisible && (
        <JoinWorkspacePopup
          onClose={() => setJoinWorkspacePopupVisible(false)}
          onJoin={handleJoinWorkspace}
        />
      )}
      {isInvitePopupVisible && (
        <InvitePeoplePopup
          workspace={currentWorkspace}
          onClose={() => setInvitePopupVisible(false)}
        />
      )}
      {isConfirmDeleteVisible && (
        <ConfirmDeletePopup
          workspaceName={currentWorkspace.name}
          onConfirm={handleDeleteWorkspace}
          onClose={() => setConfirmDeleteVisible(false)}
        />
      )}
      {/* Conditionally render rename popup */}
      {isRenameWorkspaceVisible && (
        <RenameWorkspacePopup
          currentWorkspaceName={currentWorkspace.name}
          onClose={() => setRenameWorkspaceVisible(false)}
          onRename={handleRenameWorkspace}
        />
      )}
    </div>
  );
}

export default App;
