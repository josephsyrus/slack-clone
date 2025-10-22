const UserPopup = ({ user, onLogout }) => {
  return (
    <div className="user-popup">
      <div className="user-popup-header">
        <div className="user-popup-username" title={user.username}>
          {user.username}
        </div>
        <div className="user-popup-email" title={user.email}>
          {user.email}
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
