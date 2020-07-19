import React from "react";
import { getCalc1x1 } from "./../../services/calc1x1Service";
import {
  getCalculationSmall1x1,
  randomCalculationBig1x1,
  randomCalculationRational,
} from "./randomCalculation";
import { CalcArea1x1 } from "../CalcArea1x1/CalcArea1x1";
import { CalcAreaRational } from "../CalcAreaRational/CalcAreaRational";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import "./DivCalculations.scss";

export class DivCalculations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCalculations: [],
      solvedCalculations: 0,
      calcDone: false,
      doneCalculations: [],
      notDoneCalculations: [],
      notDoneCalculationsReps: 0,
      debugLevel: 3,
      keyboardActive: false,
    };

    this.isVisRef = React.createRef();
    this.isSolvedRef = React.createRef();
    this.fallRef = React.createRef();
  }

  componentWillMount() {
    if (this.state.debugLevel === 2) {
      console.log(
        "componentWillMount: ",
        this.state.newCalculations,
        this.props
      );
    }
    if (this.state.newCalculations.length === 0) {
      this.getNewCalc(this.props.appState, this.props.propsCheckbox);
    }
  }

  createTypeString = (checks) => {
    let type = [];
    if (checks[0] === true) type.push("plus");
    if (checks[1] === true) type.push("minus");
    if (checks[2] === true) type.push("mal");
    if (checks[3] === true) type.push("geteilt");
    return type;
  };

  getNewCalc = async (state, checkbox) => {
    const { userData } = this.props;
    let checks = state.checkboxChecks;
    let select = state.selectSelected;
    let values, body, data;
    let newCalcValues;

    if (this.state.debugLevel >= 2)
      console.log(
        "getNewCalc/checks: ",
        state,
        checkbox,
        checks,
        select,
        userData
      );

    body = {
      schoolClass: userData.schoolClass,
      difficulty: userData.difficulty,
      type: { $in: this.createTypeString(checks) },
    };
    console.log(body, this.createTypeString(checks), checks);

    // random calculation for small 1x1
    if (select === 1) {
      // Fetch new calculation via httpService from DB
      data = await getCalc1x1(body);

      // Extract relevant data
      newCalcValues = {
        calcStr: data.task,
        result: data.result,
      };
    }
    // random calculation for big 1x1
    if (select === 2) {
      newCalcValues = randomCalculationBig1x1(values, checks);
    }
    // random calculation for big 1x1
    if (select === 3) {
      newCalcValues = randomCalculationRational(values, checks);
    }

    // set newCalculation
    let newCalculations = this.state.newCalculations;
    newCalculations.push(newCalcValues);
    this.setState({ newCalculations });
    console.log("DivCalculations/getNewCalc", data, newCalcValues);
  };

  remNewCalculation = () => {
    let item = this.state.newCalculations.shift();
    if (this.state.debugLevel >= 2) {
      console.log("DivCalc/remNewCalculation/item: ", item);
    }
    return item;
  };

  addDoneCalculation = (arr, passed) => {
    let entry;
    // add arr to doneCalculations or notDoneCalculations, dependent on quizz result
    passed
      ? (entry = this.state.doneCalculations)
      : (entry = this.state.notDoneCalculations);
    entry.unshift(arr);
    if (this.state.debugLevel >= 2) {
      console.log("DivCalc/addDoneCalc/entry: ", entry);
    }
    passed
      ? this.setState({ doneCalculations: entry })
      : this.setState({ notDoneCalculations: entry });
  };

  evalResult = (input, result) => {
    //this.state.debugLevel >= 2 ? console.log('evalResult: ', input, result): '';
    return (
      parseFloat(input).toPrecision(3) === parseFloat(result).toPrecision(3)
    );
  };

  handleGoBtnClick = (value) => {
    // get user input and result
    let input = value;
    input = input.replace(",", ".");
    let result = this.state.newCalculations[0].result;

    // evaluate user input and result / delete entries
    let res = this.evalResult(input, result);
    if (this.state.debugLevel === 3) {
      console.log("debug/input: ", value, res);
    }
    //event.currentTarget.parentNode.querySelector('input').value = '';
    //this.handleInputChange(event);
    //console.log('debug: ', res);

    // repeat or cheer
    if (res) {
      //this.state.debugLevel >= 2 ? console.log("Yeah", this.isVisRef.current): '';
      // show animation for 3 secs
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/cheer.gif)";
      isInvis.classList.toggle("isInvis");
      setTimeout(() => {
        isInvis.classList.toggle("isInvis");
      }, 3000);

      //const isSolved = this.isSolvedRef.current;
      //isSolved.classList.toggle('isSolved');
      //setTimeout(() => {isSolved.classList.toggle('isSolved');}, 300);

      // Update proposed quizzes, transfer result -> passed
      this.updateLists(true);
      this.setState({ notDoneCalculationsReps: 0 });
    } else {
      //this.state.debugLevel >= 2 ? console.log('Ouuuh'): '';
      this.setState({
        notDoneCalculationsReps: this.state.notDoneCalculationsReps + 1,
      });
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/think.gif)";
      isInvis.classList.toggle("isInvis");
      setTimeout(() => {
        isInvis.classList.toggle("isInvis");
      }, 3000);

      if (this.state.notDoneCalculationsReps === 1) {
        // Update proposed quizzes, transfer result -> not passed
        this.updateLists(false);
        this.setState({ notDoneCalculationsReps: 0 });
      }
    }
  };

  updateLists = (passed) => {
    // take over to doneCalculations and remove from newCalculations
    let arr = this.remNewCalculation();
    if (arr.calcStr.length === 6) {
      arr.calcStr = `(${arr.calcStr[0]}${arr.calcStr[1]}) ${arr.calcStr[2]} (${arr.calcStr[3]}${arr.calcStr[4]}) ${arr.calcStr[5]}`;
    }
    passed
      ? this.addDoneCalculation(arr, true)
      : this.addDoneCalculation(arr, false);

    // update solved counter
    this.setState({
      solvedCalculations: this.state.solvedCalculations + 1,
    });

    // calculate whether done or not
    if (
      this.props.appState.checkboxTasksNo.length ===
      this.state.solvedCalculations + 1
    ) {
      this.setState({
        calcDone: true,
      });
    }

    // getNewCalc or finish
    if (this.state.debugLevel === 3) {
      console.log(
        "updateLists/finish or newCalc: ",
        this.props.appState,
        this.props.propsCheckbox,
        this.props.appState.checkboxTasksNo,
        this.state.solvedCalculations
      );
    }
    if (this.state.calcDone) {
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/cheer.gif)";
      isInvis.classList.toggle("isInvis");
      //const isSolved = this.isSolvedRef.current;
      //isSolved.classList.toggle('isInvis');
    } else {
      this.getNewCalc(this.props.appState, this.props.propsCheckbox);
    }
  };

  // RENDER
  renderResultList = (calc) => {
    calc = calc.length === 0 ? [{ calcStr: "...gleich gehts los" }] : calc;
    if (this.state.debugLevel === 2) {
      console.log("DivCalculations/renderResultList: ", calc);
    }
    return calc.map((item, i) => {
      //console.log('renderList: ', item.calcStr, item.result);
      return (
        <p key={i}>
          {item.calcStr} {item.result}
        </p>
      );
    });
  };

  renderProgressBar = (items) => {
    return items.map((item, i) => {
      if (this.state.solvedCalculations >= item) {
        return item % 5 === 0 ? (
          <p key={i} className="bigBean yellow">
            <DoneOutlineIcon />
          </p>
        ) : (
          <p key={i} className="bean yellow"></p>
        );
      } else {
        return item % 5 === 0 ? (
          <p key={i} className="bigBean grey">
            {item / 5}
          </p>
        ) : (
          <p key={i} className="bean grey"></p>
        );
      }
    });
  };

  renderList = (select) => {
    if (this.state.debugLevel === 2)
      console.log("DivCalculations / renderList: ", select);
    if (this.state.calcDone) {
      return <h1>Prima...geschafft...</h1>;
    } else if (select === 1 || select === 2) {
      return (
        <CalcArea1x1
          appState={this.props.appState}
          calcState={this.state}
          input={this.props.input}
          goButton={this.handleGoBtnClick}
          keyboardState={this.props.keyboardState}
        />
      );
    } else if (select === 3) {
      return (
        <CalcAreaRational
          appState={this.props.appState}
          calcState={this.state}
          goButton={this.handleGoBtnClick}
          keyboardState={this.props.keyboardState}
        />
      );
    }
  };

  render() {
    const { debugLevel } = this.state;
    if (debugLevel >= 2) console.log("start render DivCalculation", this.props);
    return (
      <div className="divCalculationsHead">
        <div className="divCalculations">
          <div className="progressBlock">
            {this.renderProgressBar(this.props.appState.checkboxTasksNo)}
          </div>

          <div className="calculationBlock">
            {this.renderList(this.props.appState.selectSelected)}
            <div className="cheerRbooh isInvis" ref={this.isVisRef}></div>
          </div>

          <div className="resultBlock">
            <div className="listCalc">
              <div className="listCalcHeader">Yeah!</div>
              <div className="listCalcBody">
                {this.renderResultList(this.state.doneCalculations)}
              </div>
            </div>
            <div className="listNotCalc">
              <div className="listNotCalcHeader">Beim nächsten mal</div>
              <div className="listNotCalcBody">
                {this.renderResultList(this.state.notDoneCalculations)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
