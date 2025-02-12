import React from "react";

const Modal = ({ title, button, body, footer, isActive, className = "" }) => {
  return (
    isActive && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-20">
        <div
          className={`bg-white rounded-md shadow-md w-[80vw] h-[80vh] relative z-50 p-6 space-y-8 ${className}`}>
          <div className="flex items-center justify-between">
            <h3 className="lead">{title}</h3>
            {button && button}
          </div>
          {/* Body */}
          <div>{body}</div>
          {/* Footer */}
          {footer && <div>{footer}</div>}
        </div>
      </div>
    )
  );
};

export default Modal;
