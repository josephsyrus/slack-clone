// frontend/src/components/ui/AddWorkspaceChoicePopup.jsx

import React from "react";

const AddWorkspaceChoicePopup = ({ onClose, onChooseCreate, onChooseJoin }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="popup-title">Add a Workspace</h1>
        <p className="invite-description">
          Create a new workspace for your team, or join an existing one using a
          Workspace ID.
        </p>
        <div className="choice-buttons-container">
          <button
            onClick={onChooseCreate}
            className="popup-button choice-button"
          >
            Create a Workspace
          </button>
          <button
            onClick={onChooseJoin}
            className="popup-button choice-button join-button"
          >
            Join a Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkspaceChoicePopup;
