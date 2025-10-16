// frontend/src/components/ui/RenameWorkspacePopup.jsx

import React, { useState } from "react";

const RenameWorkspacePopup = ({ currentWorkspaceName, onClose, onRename }) => {
  const [newName, setNewName] = useState(currentWorkspaceName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() && newName.trim() !== currentWorkspaceName) {
      onRename(newName.trim());
    }
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="popup-title">Rename Workspace</h1>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="input-group">
            <label htmlFor="ws-new-name">Workspace Name</label>
            <input
              id="ws-new-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="popup-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenameWorkspacePopup;
