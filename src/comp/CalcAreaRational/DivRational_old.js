import React from 'react';
//import logo from '../logo.svg';
import './DivRational.scss';

import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';

import ValidationTextFields from '../ValidationTextFields/ValidationTextFields';

export class DivRational extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCalculations: [],
      doneCalculations: [],
      notDoneCalculations: [],
      notDoneCalculationsReps: 0,
      debugLevel: 2,
      validationTextFieldAValue: '',
      validationTextFieldAError: true,
      validationTextFieldAHelperTxt: '',
      validationTextFieldBValue: '',
      validationTextFieldBError: true,
      validationTextFieldBHelperTxt: '',
      validationTextFieldCValue: '',
      validationTextFieldCError: true,
      validationTextFieldCHelperTxt: '',
      validationTextFieldDValue: '',
      validationTextFieldDError: true,
      validationTextFieldDHelperTxt: '',
    }

    this.isVisRef = React.createRef();
    this.isSolvedRef = React.createRef();
    this.fallRef = React.createRef();
    this.isInputABCRef = React.createRef();

    this.getNewCalc = this.getNewCalc.bind(this);
    this.evalResult = this.evalResult.bind(this);
    this.handleGoBtnClick = this.handleGoBtnClick.bind(this);
    this.remNewCalculation = this.remNewCalculation.bind(this);
    this.addDoneCalculation = this.addDoneCalculation.bind(this);
    this.updateLists = this.updateLists.bind(this);
    this.renderList = this.renderList.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
  }

  componentWillMount() {
    console.log('DivRational/componentWillMount: ', this.state.newCalculations, this.props);
    if (this.state.newCalculations.length === 0) {
      this.getNewCalc(this.props.propsCheckbox, this.props.selections); //.selectSelected);
    }
  }

  getNewCalc(calc, selections) {
    let select = selections.selectSelected;
    let checks = selections.checkboxChecks;

    let values = calc.values[select];
    if (this.state.debugLevel >= 2) {console.log('DivRational/getNewCalc/checks: ', calc, select, values, checks);};
    let op1, op2, op3;
    let opSw1, opSw2, opSw3;
    let calc_str = [];
    let num1, num2;
    let result;

    // evaluate checks of checkbox
    let withMulti = checks[1] || checks[3];
    let withAddSub = checks[0] || checks[2];
    // random selection of operation
    opSw1 = Math.floor(Math.random()*2)+1;
    if (withMulti && withAddSub) {
      // + / - / x
      opSw2 = Math.floor(Math.random()*3)+1;
    } else if (!withMulti && withAddSub) {
      // + / -
      opSw2 = Math.floor(Math.random()*2)+1;
    } else if (withMulti && !withAddSub) {
      // x
      opSw2 = 1;
    } else {
      // + / -
      opSw2 = Math.floor(Math.random()*2)+1;
    }
    opSw3 = Math.floor(Math.random()*2)+1;

    opSw1 === 1 ? op1 = '+': op1 = '-';
    if (withMulti && withAddSub) {
      opSw2 === 2 ? op2 = 'x': opSw2 === 1 ? op2 = '+' : op2 = '-';;
    } else if (!withMulti && withAddSub) {
      opSw2 === 1 ? op2 = '+' : op2 = '-';
    } else if (withMulti && !withAddSub) {
      op2 = 'x';
    } else {
      opSw2 === 1 ? op2 = '+' : op2 = '-';
    }
    opSw3 === 1 ? op3 = '+': op3 = '-';

    let nums = [];
    // random selection of numbers
    // (+/-)
    if (checks[0]) {
      num1 = Math.floor(Math.random()*values[0])+1;
      num2 = Math.floor(Math.random()*values[0])+1;
      nums.push({num1: num1, num2: num2});
      console.log('nums: ',nums);
    };
    // (x)
    if (checks[1]) {
      num1 = Math.floor(Math.random()*values[1])+1;
      num2 = Math.floor(Math.random()*values[1])+1;
      nums.push({num1: num1, num2: num2});
      console.log('nums: ',nums);
    };
    // (+/-) Komma
    if (checks[2]) {
      num1 = (Math.floor(Math.random()*values[2])+1)/10;
      num2 = (Math.floor(Math.random()*values[2])+1)/10;
      nums.push({num1: num1, num2: num2});
      console.log('nums: ',nums);
    };
    // (x) Komma
    if (checks[3]) {
      num1 = (Math.floor(Math.random()*values[3])+1)/10;
      num2 = (Math.floor(Math.random()*values[3])+1)/10;
      nums.push({num1: num1, num2: num2});
      console.log('nums: ',nums);
    };
    let numsSelect = Math.floor(Math.random()*nums.length);
    num1 = nums[numsSelect].num1;
    num2 = nums[numsSelect].num2;
    console.log('Auswahl: ', num1, num2, numsSelect, nums, opSw2);

    // preparation of calculation string
    let num1comma = num1.toString().replace('.', ',');
    let num2comma = num2.toString().replace('.', ',');
    calc_str[0] = op1;
    calc_str[1] = num1comma;
    calc_str[2] = op2;
    calc_str[3] = op3;
    calc_str[4] = num2comma;
    calc_str[5] = '=';


    opSw1 === 1 ? num1 = num1 : num1 = -num1;
    opSw3 === 1 ? num2 = num2 : num2 = -num2;
    console.log('Vorzeichen: ', num1, num2, opSw1, opSw2);


    // calculation of result
    op2 === 'x' ? result = num1 * num2 : op2 === '+' ? result = num1 + num2 : result = num1 - num2;
    console.log('Ergebnis: ', num1, num2, op2, result);

    let entry = this.state.newCalculations;
    entry.push({calcStr: calc_str, result: result.toPrecision(3)});

    this.setState({
      newCalculations: entry
    });
    if (this.state.debugLevel >= 2) {console.log('DivRational/getNewCalc/summary: ', this.state.newCalculations);};
  }

  remNewCalculation() {
    // remove current calculation item from /newCalculation/ list and return this item
    let item = this.state.newCalculations.shift();
    if (this.state.debugLevel >= 2) {console.log(`DivRational/remNewCalculation: `, item);};
    return item;
  }

  addDoneCalculation(arr, passed) {
    let entry;
    // add arr to doneCalculations or notDoneCalculations list, dependent on quizz result
    passed ? entry = this.state.doneCalculations: entry = this.state.notDoneCalculations;
    entry.unshift(arr);
    if (this.state.debugLevel >= 2) {console.log('DivRational/addDoneCalc: ', entry);};
    passed ? this.setState({doneCalculations: entry}): this.setState({notDoneCalculations: entry});
  }

  evalResult(input, result) {
    // evaluate input against result and return evaluation result
    // convert input to float
    if (this.state.debugLevel >= 2) {console.log('evalResult: ', input, result);};
    return parseFloat(input).toPrecision(3) === parseFloat(result).toPrecision(3);
  }

  updateLists(passed) {
    // take over to doneCalculations and remove from newCalculations
    let arr = this.remNewCalculation();
    arr.calcStr = `(${arr.calcStr[0]}${arr.calcStr[1]})${arr.calcStr[2]}(${arr.calcStr[3]}${arr.calcStr[4]})${arr.calcStr[5]}`;
    passed ? this.addDoneCalculation(arr, true): this.addDoneCalculation(arr, false);

    // getNewCalc
    if (this.state.debugLevel >= 2) {console.log('DivRational/updateLists: ', this.props.selections, this.props.propsCheckbox);};
    this.getNewCalc(this.props.propsCheckbox, this.props.selections);
  }

  handleGoBtnClick (event) {
    // get user input and result
    let input = event.currentTarget.parentNode.querySelector('input').value;
    input = input.replace(',' , '.');
    let result = this.state.newCalculations[0].result;

    // evaluate user input and evalResult
    // delete user input
    let res = this.evalResult(input, result);

    const isInputABC = this.isInputABCRef;
    let arr = Array.from(isInputABC.current.children);
    arr.map(item => {
      return item.querySelector('input').value = '';
    });

    const isSolvedD = this.isSolvedRef;
    isSolvedD.current.querySelector('input').value = '';

    console.log('DivRational/handleGoBtnClick: ', input, result, res);

    // repeat or cheer
    if (res) {
      console.log(this.state.debugLevel >= 2 ? `Yeah: ${this.isVisRef.current}` : '');
      // show animation for 3 secs
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/cheer.gif)";
      isInvis.classList.toggle('isInvis');
      setTimeout(() => {isInvis.classList.toggle('isInvis');}, 3000);

      const isSolved = this.isSolvedRef.current;
      isSolved.classList.toggle('isSolved');
      setTimeout(() => {isSolved.classList.toggle('isSolved');}, 300);

      // Update proposed quizzes, transfer result -> passed
      this.updateLists(true);
      this.setState({notDoneCalculationsReps: 0});
    } else {
      console.log(this.state.debugLevel >= 2 ? `Ouuuh: ${this.isVisRef.current}` : '');
      this.setState({
        notDoneCalculationsReps: this.state.notDoneCalculationsReps + 1
      });
      const isInvis = this.isVisRef.current;
      isInvis.style.backgroundImage = "url(./images/think.gif)";
      isInvis.classList.toggle('isInvis');
      setTimeout(() => {isInvis.classList.toggle('isInvis');}, 3000);

      if (this.state.notDoneCalculationsReps === 1) {
        // Update proposed quizzes, transfer result -> not passed
        this.updateLists(false);
        this.setState({notDoneCalculationsReps: 0});
      }
    }

    // set focus on first input TextField
    isInputABC.current.children[0].querySelector('input').focus();
  }

  keyPressed(event) {
    console.log(this.state.debugLevel >= 2 ? 'DivRational/Key Pressed' : '');
    if (event.key === "Enter") {
      console.log('Debug');
      this.handleGoBtnClick(event);
      event.preventDefault();
    }
  }

  handleChangeA(event) {
    let valA_1 = event.target.value;
    let valA_2 = this.state.newCalculations[0].calcStr[0]+this.state.newCalculations[0].calcStr[1];

    // do validation
    let patt = /^([+-]{0,1}[,0-9]{1,3})$/g;
    let notValid = patt.test(valA_1);
    console.log('DivRational/handleChangeA: ', valA_1, valA_2, notValid);

    // Dependend on the input field entry the state and helper text is set
    notValid
    ? this.setState({
      validationTextFieldAValue: valA_1,
      validationTextFieldAError: notValid,
      validationTextFieldAHelperTxt: '',
    })
    : this.setState({
      validationTextFieldAValue: valA_1,
      validationTextFieldAError: notValid,
      validationTextFieldAHelperTxt: '+/- Ziffern',
    });
  }

  handleChangeB(event) {
    let valB_1 = event.target.value;
    //let valB_2 = this.state.newCalculations[0].calcStr[2];

    // do validation
    let patt = /^([+-x]{1})$/g;
    let notValid = patt.test(valB_1);
    console.log('DivRational/handleChangeB: ');

    // Dependend on the input field entry the state and helper text is set
    notValid
    ? this.setState({
      validationTextFieldBValue: valB_1,
      validationTextFieldBError: notValid,
      validationTextFieldBHelperTxt: '',
    })
    : this.setState({
      validationTextFieldBValue: valB_1,
      validationTextFieldBError: notValid,
      validationTextFieldBHelperTxt: '+/-',
    });
  }

  handleChangeC(event) {
    let valC_1 = event.target.value;
    let valC_2 = this.state.newCalculations[0].calcStr[3]+this.state.newCalculations[0].calcStr[4];

    // do validation
    let patt = /^([,0-9]{1,3})$/g;
    let notValid = patt.test(valC_1);
    console.log('DivRational/handleChangeC: ', valC_1, valC_2, notValid);

    // Dependend on the input field entry the state and helper text is set
    notValid
    ? this.setState({
      validationTextFieldCValue: valC_1,
      validationTextFieldCError: notValid,
      validationTextFieldCHelperTxt: '',
    })
    : this.setState({
      validationTextFieldCValue: valC_1,
      validationTextFieldCError: notValid,
      validationTextFieldCHelperTxt: 'nur Ziffern',
    });
  }

  handleChangeD(event) {
    let valD_1 = event.target.value;
    let valD_2 = this.state.newCalculations[0].result;

    // do validation
    let patt = /^([+-]{0,1}[,0-9]{1,3})$/g;
    let notValid = patt.test(valD_1);
    console.log('DivRational/handleChangeD: ', valD_1, valD_2, notValid);

    // Dependend on the input field entry the state and helper text is set
    notValid
    ? this.setState({
      validationTextFieldDValue: valD_1,
      validationTextFieldDError: notValid,
      validationTextFieldDHelperTxt: '',
    })
    : this.setState({
      validationTextFieldDValue: valD_1,
      validationTextFieldDError: notValid,
      validationTextFieldDHelperTxt: '(+/-) Ziffern',
    });
  }

  renderList(calc) {
      return calc.map((item, i) => {
        console.log(this.state.debugLevel >= 2 ? `DivRational/renderList: ${item}, ${i}` : '');
        return <p key={i} >{item.calcStr} {item.result.toString().replace('.',',')}</p>;
      });
  }

  render() {
    return (
      <div className="ratioBody" >
        <div className="divRational" >
          <div className="blockCalc">
            <div className="item1" >
              <Filter1Icon />
              <p className="col-1">los geht's: </p>
              <p className="col-2 calcStr">({this.state.newCalculations[0].calcStr[0]}{this.state.newCalculations[0].calcStr[1]})</p>
              <p className="col-3 calcStr">{this.state.newCalculations[0].calcStr[2]}</p>
              <p className="col-4 calcStr">({this.state.newCalculations[0].calcStr[3]}{this.state.newCalculations[0].calcStr[4]})</p>
              <p className="col-5 calcStr">{this.state.newCalculations[0].calcStr[5]}</p>
            </div>
            <div className="item2" >
              <Filter2Icon />
              <p className="col-1">Klammer auflösen: </p>
              <div className="item2_1" ref={this.isInputABCRef} >
                <ValidationTextFields class="col-2 calcStr" helperText={this.state.validationTextFieldAHelperTxt} error={!this.state.validationTextFieldAError} onChange={this.handleChangeA} />
                <ValidationTextFields class="col-3 calcStr" helperText={this.state.validationTextFieldBHelperTxt} error={!this.state.validationTextFieldBError} onChange={this.handleChangeB} />
                <ValidationTextFields class="col-4 calcStr" helperText={this.state.validationTextFieldCHelperTxt} error={!this.state.validationTextFieldCError} onChange={this.handleChangeC} />
              </div>
              <p className="col-5 calcStr">=</p>
            </div>
            <div className="item3" ref={this.isSolvedRef} >
              <Filter3Icon />
              <p className="col-1">Zusammenrechnen: </p>
              <ValidationTextFields class="col-2 calcStr" helperText={this.state.validationTextFieldDHelperTxt} error={!this.state.validationTextFieldDError} onChange={this.handleChangeD} onKeyPress={this.keyPressed} />
              <img src="./images/go-button.svg" alt="" onClick={this.handleGoBtnClick} className="goButton" />
            </div>
          </div>
          <div className="cheerRbooh isInvis" ref={this.isVisRef} >
          </div>
          <div className="listCalc" >
            <div className="listCalcHeader">
              Prima!
            </div>
            <div className="listCalcBody">
              {this.renderList(this.state.doneCalculations)}
            </div>
          </div>
          <div className="listNotCalc" >
            <div className="listNotCalcHeader">
              Die gelingen beim nächsten mal
            </div>
            <div className="listNotCalcBody">
              {this.renderList(this.state.notDoneCalculations)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
