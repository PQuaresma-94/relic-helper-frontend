import React, { useEffect, useState } from "react";
import "./Popup.css";

const Popup = ({ message, duration = 3000, type = "info" }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!show) {
    return null;
  }

  const popupClass = `popup ${
    type === "error" ? "popup--error" : "popup--success"
  }`;

  return (
    <div className={popupClass}>
      <p className="popup__content">{message}</p>
    </div>
  );
};

export default Popup;
