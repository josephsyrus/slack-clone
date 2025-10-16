// frontend/src/components/auth/SignUpPage.jsx

import React, { useState } from "react";

const SignUpPage = ({ onLogin, onSwitchToSignIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only: just log in the user if fields are not empty and passwords match
    if (
      username.trim() &&
      email.trim() && // Add email to validation
      password.trim() &&
      password === confirmPassword
    ) {
      // In a real app, you'd send username, email, and password to the backend.
      // Here, we just pass the username to the onLogin handler.
      onLogin({ uid: username.trim(), email: email.trim() });
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

        {/* New Email Field */}
        <div className="input-group">
          <label htmlFor="email-signup">Email Address</label>
          <input
            id="email-signup"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        {/* End of New Email Field */}

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
