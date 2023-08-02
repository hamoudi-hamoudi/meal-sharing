import React from "react";

const Modal = ({ isOpen }) => {
  return <>{isOpen ? <h1>you have been served</h1> : null} </>;
};

export default Modal;
