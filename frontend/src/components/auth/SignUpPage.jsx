import React, { useState } from "react";

const SignUpPage = ({ onLogin, onSwitchToSignIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only: just log in the user if passwords match and fields are not empty
    if (username.trim() && password.trim() && password === confirmPassword) {
      onLogin({ uid: username.trim() });
    }
  };

  return (
    <div className="popup-box">
      <h1 className="popup-title">Create an Account</h1>
      <form onSubmit={handleSubmit} className="popup-form">
        <div className="input-group">
          <label htmlFor="username-signup">Username</label>
          <input
            id="username-signup"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password-signup">Password</label>
          <input
            id="password-signup"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password-signup">Confirm Password</label>
          <input
            id="confirm-password-signup"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="popup-button">
          Sign Up
        </button>
      </form>
      <p className="auth-switch-text">
        Already have an account?{" "}
        <span className="auth-switch-link" onClick={onSwitchToSignIn}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignUpPage;
