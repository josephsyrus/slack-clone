// frontend/src/components/ui/JoinWorkspacePopup.jsx

import React, { useState } from "react";

const JoinWorkspacePopup = ({ onClose, onJoin }) => {
  const [workspaceId, setWorkspaceId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workspaceId.trim()) {
      onJoin(workspaceId.trim());
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="popup-title">Join a Workspace</h1>
        <p className="invite-description">
          Enter a Workspace ID below to be added to the workspace.
        </p>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="input-group">
            <label htmlFor="ws-id">Workspace ID</label>
            <input
              id="ws-id"
              type="text"
              value={workspaceId}
              onChange={(e) => setWorkspaceId(e.target.value)}
              placeholder="e.g. ws1"
            />
          </div>
          <button type="submit" className="popup-button">
            Join Workspace
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinWorkspacePopup;
