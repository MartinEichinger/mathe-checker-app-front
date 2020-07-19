import React from "react";
import { NavLink, Link } from "react-router-dom";
import SwitchLabels from "../SwitchLabels/SwitchLabels";
import "./Nav.scss";

export function Nav({ onChange }) {
  const handleChange = (state) => {
    onChange(state);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-light">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="./images/Logo-MatheChecker.png"
          width="40"
          height="40"
          className="d-inline-block align-top mr-3"
          alt=""
          loading="lazy"
        ></img>
        <span className="h2 mr-3">Mathe-Checker</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav mr-auto">
          <NavLink to="/" className="nav-item nav-link h4 mr-3">
            Home
          </NavLink>
          <NavLink to="/calc" className="nav-item nav-link h4 mr-3">
            Rechnen
          </NavLink>
          <NavLink to="/about" className="nav-item nav-link h4 mr-3">
            Über
          </NavLink>
          <NavLink to="/login" className="nav-item nav-link h4 mr-3">
            Login
          </NavLink>
        </div>
        <SwitchLabels onChange={handleChange} className="ml-auto mb-4" />
      </div>
    </nav>
  );
}

export default Nav;

// function renderSortByItems(props) {
//   return props.propsDiv.items.map((item, i) => {
//     let navClass = "navigation-" + i;
//     return (
//       <a href={item.link} className={navClass} key={i}>
//         {item.name}
//       </a>
//     );
//   });
// }

// export function Nav(props) {
//   const handleChange = (state) => {
//     console.log(`Nav/handleChange: ${state}`);
//     props.onChange(state);
//   };

//   return (
//     <div className="headerBody">
//       <div className="header">
//         <div className="navigationLogo">
//           <img src={props.propsDiv.img.src} alt="" />
//           <h1>{props.propsDiv.img.txt}</h1>
//         </div>
//         <div className="navigation">
//           <div className="nav-1">{renderSortByItems(props)}</div>
//           <div className="nav-2">
//             <SwitchLabels onChange={handleChange} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
