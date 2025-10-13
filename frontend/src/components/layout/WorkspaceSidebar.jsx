import React from "react";

const WorkspaceSidebar = ({
  data,
  currentWorkspaceId,
  onSelectWorkspace,
  onAddWorkspace,
}) => {
  const workspaces = Object.entries(data).map(([id, ws]) => ({ id, ...ws }));

  return (
    <nav className="workspace-sidebar">
      <ul className="workspace-list">
        {workspaces.map((ws) => (
          <li key={ws.id} className="workspace-item" title={ws.name}>
            <button
              className={`workspace-button ${
                currentWorkspaceId === ws.id ? "active" : ""
              }`}
              onClick={() => onSelectWorkspace(ws.id)}
            >
              {ws.initial}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onAddWorkspace}
        className="workspace-button add-workspace-btn"
        title="Add Workspace"
      >
        +
      </button>
    </nav>
  );
};

export default WorkspaceSidebar;
