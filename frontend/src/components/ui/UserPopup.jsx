import React from "react";

const UserPopup = ({ user, onLogout }) => {
  return (
    <div className="user-popup">
      <div className="user-popup-header">
        <div className="user-popup-username" title={user.uid}>
          {user.uid}
        </div>
        <div className="user-popup-status">Online</div>
      </div>
      <button onClick={onLogout} className="user-popup-logout-btn">
        Logout
      </button>
    </div>
  );
};

export default UserPopup;
