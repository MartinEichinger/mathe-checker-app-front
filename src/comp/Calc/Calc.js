import React from "react";

import "./Calc.scss";
import { DivCalculations } from "../DivCalculations/DivCalculations";
import SimpleSelect from "../SimpleSelect/SimpleSelect";
import CheckboxLabels from "../CheckboxLabels/CheckboxLabels";

class Calc extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      selectSelected: "",
      checkboxChecks: [true, false, false, false],
      checkboxTasksNo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      tasksRunning: false,
      debugLevel: 2,
    };
    // props
    this.propsSelect = {
      labels: [
        "",
        "Kopfrechnen - kleines 1x1",
        "Kopfrechnen - großes 1x1",
        "Rationale Zahlen (+ / - / x / Kommazahlen)",
      ],
    };
    this.propsCheckbox = {
      visibility: {
        "": "invis",
        "1": "vis",
        "2": "vis",
        "3": "vis",
      },
      labels: [
        [],
        [
          "Kleines 1x1 - Addition bis 10 (+)",
          "Kleines 1x1 - Substraktion bis 10 (-)",
          "Kleines 1x1 - Multiplikation bis 10 (x)",
          "Kleines 1x1 - Division bis 10 (/)",
        ],
        [
          "Großes 1x1 - Addition bis 100 (+)",
          "Großes 1x1 - Substraktion bis 100 (-)",
          "Großes 1x1 - Multiplikation bis 25 (x)",
          "Großes 1x1 - Division bis 10 (/)",
        ],
        [
          "Addition / Substraktion rationale Zahlen bis 100",
          "... mit Kommazahlen bis 100",
          "Multiplikation rationaler Zahlen bis 25",
          "... mit Kommazahlen bis 25",
        ],
      ],
      values: [
        [1, 1, 1, 1],
        [10, 10, 10, 10],
        [100, 100, 25, 10],
        [100, 100, 25, 25],
      ],
    };
    this.propsCalc = {
      visibility: {
        "": "invis",
        "1": "vis",
        "2": "vis",
        "3": "vis",
      },
    };

    // references
    this.isVisCheckbox = React.createRef();
    this.isVisCalc1x1 = React.createRef();
    if (this.state.debugLevel >= 2) console.log("Calc/constructor: done");
  }

  handleNewSelection = (selectSelected) => {
    if (this.state.debugLevel >= 2)
      console.log(
        `App/handleNewSelection/select1: ${selectSelected}, ${this.propsSelect}, ${this.state}`
      );
    if (this.state.selectSelected !== selectSelected) {
      this.setState({ selectSelected });
      this.setState({
        tasksRunning: false,
      });
    }

    // unhide checkbox
    const isVisCheckbox = this.isVisCheckbox.current;
    let checkVisCheck = this.propsCheckbox.visibility[selectSelected];
    if (this.state.debugLevel >= 2)
      console.log(
        `App/handleNewSelection/checkbox: ${isVisCheckbox}, ${selectSelected}, ${checkVisCheck}`
      );

    try {
      if (
        isVisCheckbox.classList.contains("isInvis") &&
        checkVisCheck === "vis"
      ) {
        isVisCheckbox.classList.toggle("isInvis");
      } else if (
        !isVisCheckbox.classList.contains("isInvis") &&
        checkVisCheck === "invis"
      ) {
        isVisCheckbox.classList.toggle("isInvis");
      }
    } catch (err) {
      console.log("App/handleNewSelection/Err/checkbox: ", err.message);
    }

    // unhide calculation area
    const isVisCalc1x1 = this.isVisCalc1x1.current;
    let checkVisCalc = this.propsCalc.visibility[selectSelected];
    if (this.state.debugLevel >= 2) {
      console.log(
        `App/handleNewSelection/calculation: ${isVisCalc1x1}, ${checkVisCalc}`
      );
    }

    try {
      if (
        isVisCalc1x1.classList.contains("isInvis") &&
        checkVisCalc === "vis"
      ) {
        isVisCalc1x1.classList.toggle("isInvis");
      } else if (
        !isVisCalc1x1.classList.contains("isInvis") &&
        checkVisCalc === "invis"
      ) {
        isVisCalc1x1.classList.toggle("isInvis");
      }
    } catch (err) {
      console.log("App/handleNewSelection/Err/calculation: ", err.message);
    }
  };

  handleNewChecks = (checks) => {
    if (this.state.debugLevel >= 2) {
      console.log(`Calc/handleNewChecks: ${checks}, ${this.state}`);
    }
    if (this.state.checkboxChecks !== checks) {
      this.setState({
        checkboxChecks: checks,
      });
    }
  };

  handleGoButton = () => {
    if (this.state.debugLevel >= 2) {
      console.log(`Calc/handleGoButton: ${this.state}`);
    }
    this.setState({
      tasksRunning: true,
    });
  };

  handleKeyboardActive = (state) => {
    if (this.state.debugLevel >= 2) {
      console.log(`Calc/handleKeyboardActive: ${state}`);
    }
    this.setState({
      keyboardActive: state,
    });
    //this.propsNav.keyboardActive = state;
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("Calc/shouldCompUpdate: ", nextProps, nextState);
  //   if (nextState.keyboardActive !== this.state.keyboardActive) {
  //     return true;
  //   } else if (nextState.selectSelected !== this.state.selectSelected) {
  //     return true;
  //   } else if (nextState.tasksRunning !== this.state.tasksRunning) {
  //     return true;
  //   }
  //   return false;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   Object.entries(this.props).forEach(
  //     ([key, val]) =>
  //       prevProps[key] !== val && console.log(`Prop '${key}' changed`)
  //   );
  //   if (this.state) {
  //     Object.entries(this.state).forEach(
  //       ([key, val]) =>
  //         prevState[key] !== val && console.log(`State '${key}' changed`)
  //     );
  //   }
  // }

  // RENDER
  renderList = (select, running) => {
    if (this.state.debugLevel >= 2)
      console.log(`Calc/renderList: ${select}, ${running}`);

    const { userData } = this.props;
    console.log("calc/props", this.props);

    if (running === false && this.propsCheckbox.visibility[select] === "vis") {
      return (
        <CheckboxLabels
          propsCheckbox={this.propsCheckbox}
          propsSelect={this.propsSelect}
          selections={this.state}
          onChange={this.handleNewChecks}
          onClick={this.handleGoButton}
        />
      );
    } else {
      if (select === "") {
        return <p></p>;
      } else if (select === 1 || select === 2 || select === 3) {
        return (
          <DivCalculations
            propsCheckbox={this.propsCheckbox}
            propsSelect={this.propsSelect}
            appState={this.state}
            keyboardState={this.state.keyboardActive}
            userData={userData}
          />
        );
      } else if (select === 4) {
        //return <DivRational propsCheckbox={this.propsCheckbox} selections={this.state} />;
      }
    }
  };

  render() {
    if (this.state.debugLevel >= 2) console.log("Calc: start rendering...");

    return (
      <div className="Calc">
        <div className="simpleSelect">
          <SimpleSelect
            props={this.propsSelect}
            onChange={this.handleNewSelection}
            selections={this.state}
          />
        </div>
        <div className="isInvis" ref={this.isVisCalc1x1}>
          {this.renderList(this.state.selectSelected, this.state.tasksRunning)}
        </div>
      </div>
    );
  }
}

export default Calc;
