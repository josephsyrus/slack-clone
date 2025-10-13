import React, { useState } from "react";

const SignInPage = ({ onLogin, onSwitchToSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin({ uid: username.trim() });
    }
  };

  return (
    <div className="popup-box">
      <h1 className="popup-title">Sign In to Slack</h1>
      <form onSubmit={handleSubmit} className="popup-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="popup-button">
          Sign In
        </button>
      </form>
      <p className="auth-switch-text">
        Don't have an account?{" "}
        <span className="auth-switch-link" onClick={onSwitchToSignUp}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default SignInPage;
