import React, { useState } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

const AuthPage = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="auth-container popup-overlay">
      {isLoginView ? (
        <SignInPage
          onLogin={onLogin}
          onSwitchToSignUp={() => setIsLoginView(false)}
        />
      ) : (
        <SignUpPage
          onLogin={onLogin}
          onSwitchToSignIn={() => setIsLoginView(true)}
        />
      )}
    </div>
  );
};

export default AuthPage;
