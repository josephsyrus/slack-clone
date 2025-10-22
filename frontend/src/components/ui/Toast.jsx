import React, { useEffect } from "react";

const Toast = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-container ${type === "error" ? "toast-error" : ""}`}>
      <p>{message}</p>
      <button onClick={onClose} className="toast-close-btn">
        &times;
      </button>
    </div>
  );
};

export default Toast;
