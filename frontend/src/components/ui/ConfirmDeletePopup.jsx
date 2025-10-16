// frontend/src/components/ui/ConfirmDeletePopup.jsx

import React from "react";

const ConfirmDeletePopup = ({ workspaceName, onConfirm, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="popup-title">Delete Workspace</h1>
        <p className="invite-description">
          Are you sure you want to permanently delete the{" "}
          <strong>{workspaceName}</strong> workspace? This action cannot be
          undone.
        </p>
        <div className="choice-buttons-container">
          <button onClick={onClose} className="popup-button choice-button">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="popup-button choice-button danger-button"
          >
            Delete Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
