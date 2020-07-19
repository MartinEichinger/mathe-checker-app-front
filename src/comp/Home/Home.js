import React from "react";
import "./Home.scss";

export function Home(props) {
  return (
    <div className="home">
      <div className="head">
        <h1>Mit Spaß lernen und spielerisch wiederholen</h1>
      </div>
      <div className="bar"></div>
      <div className="body d-flex flex-md-row flex-sm-column flex-column">
        <div className="bullet w-25 d-sm-flex align-items-sm-stretch">
          <div className="circle blue">
            <img src="./images/LP_btn1.png" alt="" />
            <h4 className="mt-5 text-left text-uppercase">
              <u>Einfach anmelden</u>
            </h4>
            <h5 className="text-left">
              Kostenlos anmelden und direkt losstarten.
            </h5>
          </div>
        </div>
        <div className="bullet w-25 d-sm-flex align-items-sm-stretch">
          <div className="circle yellow">
            <img src="./images/LP_btn2.png" alt="" />
            <h4 className="mt-5 text-left text-uppercase">
              <u>Einfach auswählen</u>
            </h4>
            <h5 className="text-left">
              Aufgaben auswählen die man üben möchte. Aufgaben werden nach
              Klassenstufe passend ausgewählt.
            </h5>
          </div>
        </div>
        <div className="bullet w-25 d-sm-flex align-items-sm-stretch">
          <div className="circle green">
            <img src="./images/LP_btn3.png" alt="" />
            <h4 className="mt-5 text-left text-uppercase">
              <u>Einfach überall</u>
            </h4>
            <h5 className="text-left">
              Ob am PC, Tablet oder Handy. Kurz üben oder auch mal länger.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

//<img src="./images/LP_head.png" alt="" />
