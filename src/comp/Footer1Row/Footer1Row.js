import React from "react";
import "./Footer1Row.scss";

export function Footer1Row() {
  return (
    <nav className="navbar fixed-bottom navbar-expand-md navbar-light">
      <img
        src="./images/Logo-MatheChecker.png"
        width="40"
        height="40"
        className="d-inline-block align-top mr-auto ml-auto"
        alt=""
        loading="lazy"
      />
    </nav>
  );
}

export default Footer1Row;
