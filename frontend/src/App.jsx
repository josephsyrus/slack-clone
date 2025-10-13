import React, { useState } from "react";
import { initialData } from "./data/mockData";
import AuthPage from "./components/auth/AuthPage";
import WorkspaceSidebar from "./components/layout/WorkspaceSidebar";
import ChannelSidebar from "./components/layout/ChannelSidebar";
import Chat from "./components/chat/Chat";
import AddWorkspacePopup from "./components/ui/AddWorkspacePopup";

function App() {
  // --- App State ---
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState(null); // No user logged in initially
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const [isAddWorkspacePopupVisible, setAddWorkspacePopupVisible] =
    useState(false);
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
    setUserPopupVisible(false); // Close popup on logout
  };

  const handleSelectWorkspace = (workspaceId) => {
    setCurrentWorkspaceId(workspaceId);
    //opening the first channel in the workspace
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
      name,
      initial,
      channels: [{ id: newChannelId, name: "general" }],
      messages: { [newChannelId]: [] },
    };

    setData((prevData) => ({ ...prevData, [newWorkspaceId]: newWorkspace }));
    setCurrentWorkspaceId(newWorkspaceId);
    setCurrentChannelId(newChannelId);
  };

  const handleCreateChannel = (channelName) => {
    const newChannel = {
      id: `c${Date.now()}`,
      name: channelName,
    };
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

  // --- Render Logic ---
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // --- Derived State for Logged-In View ---
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
        onAddWorkspace={() => setAddWorkspacePopupVisible(true)}
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
      />
      <Chat
        channel={currentChannel}
        messages={messagesForCurrentChannel}
        onSendMessage={handleSendMessage}
        user={user}
      />

      {isAddWorkspacePopupVisible && (
        <AddWorkspacePopup
          onClose={() => setAddWorkspacePopupVisible(false)}
          onCreate={handleCreateWorkspace}
        />
      )}
    </div>
  );
}

export default App;
