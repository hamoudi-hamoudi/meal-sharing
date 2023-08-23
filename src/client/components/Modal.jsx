import React from "react";
import "./modal.css";
const Modal = ({ isOpen, text }) => {
  return (
    <div className={`modal ${isOpen ? "visible" : ""}`}>
      <div className="modal-card">
        <h1>You have been served</h1>
        {text ? <p>Enjoy your experience!</p> : <p> Your Review Submited</p>}
      </div>
    </div>
  );
};

export default Modal;
