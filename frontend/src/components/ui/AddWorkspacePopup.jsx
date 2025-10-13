import React, { useState } from "react";

const AddWorkspacePopup = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && initial.trim()) {
      onCreate(name.trim(), initial.trim().substring(0, 1).toUpperCase());
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="popup-title">Create Workspace</h1>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="input-group">
            <label htmlFor="ws-name">Workspace Name</label>
            <input
              id="ws-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Marketing Team"
            />
          </div>
          <div className="input-group">
            <label htmlFor="ws-initial">Initial</label>
            <input
              id="ws-initial"
              type="text"
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              placeholder="e.g. M"
              maxLength="1"
            />
          </div>
          <button type="submit" className="popup-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkspacePopup;
