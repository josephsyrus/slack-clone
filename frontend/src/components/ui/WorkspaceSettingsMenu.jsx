import { TrashIcon, RenameIcon } from "./Icons";

const WorkspaceSettingsMenu = ({ onRenameClick, onDeleteClick }) => {
  return (
    <div className="workspace-settings-menu">
      <button onClick={onRenameClick} className="settings-menu-button">
        <RenameIcon />
        <span>Rename Workspace</span>
      </button>
      <button onClick={onDeleteClick} className="settings-menu-button danger">
        <TrashIcon />
        <span>Delete Workspace</span>
      </button>
    </div>
  );
};

export default WorkspaceSettingsMenu;
