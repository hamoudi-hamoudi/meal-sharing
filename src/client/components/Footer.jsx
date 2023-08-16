import React from "react";
import ReactDOM from "react-dom";
import "./footer.css";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>Copyright © {currentYear} by Hamoudi</p>
    </footer>
  );
}

export default Footer;
