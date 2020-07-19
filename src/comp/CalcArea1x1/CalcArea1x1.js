import React from 'react';
//import logo from '../logo.svg';
import './CalcArea1x1.scss';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import Filter1Icon from '@material-ui/icons/Filter1';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export class CalcArea1x1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {input1: '',},
      inputName: 'input1',
      keyboardActive: 'keyboard inactive',
      debugLevel: 1,
    }

    // item specific props
    this.propsKeyboard = {
      'default': [
        '0 1 2 3 4 5 ,',
        '6 7 8 9 0 ( )',
        'tabs - + * / {bksp} {enter}',
      ],
    }

    // Bindings
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGoBtnClick = this.handleGoBtnClick.bind(this);
    this.renderList = this.renderList.bind(this);
    // KEYBOARD
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeAll = this.onChangeAll.bind(this);
    this.setActiveInput = this.setActiveInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleInputChange(event) {
    if (this.state.debugLevel === 2) { console.log('CalcArea1x1 / handleInputChange'); };
    let val = event.target.value;

    let updatedInputObj = {
      ...this.state.input,
      [this.state.inputName]: val
    }

    this.setState(
      {input: updatedInputObj },
      () => {this.keyboard.setInput(val);}
    );
  }

  handleKeyPressed(event) {
    if (this.state.debugLevel === 2) { console.log('CalcArea1x1 / Key Pressed'); };
    if (event.key === "Enter") {
      this.handleGoBtnClick();
    }
  }

  handleGoBtnClick() {
    // start evaluation and update in DivCalculations
    if (this.state.debugLevel === 2) { console.log('CalcArea1x1 / handleGoBtnClick'); };
    let val = this.state.input['input1'];
    if (val === undefined) {val = '0'};
    this.props.goButton(val);

    // delete old textfield entries
    if (this.state.debugLevel === 3) { console.log('handleGoBtnClick/delete all: ', this.state.input); };
    let updatedInputObj;
    this.state.input['input1'] = '';
    this.keyboard.setInput('', 'input1');

    updatedInputObj = {
      ...this.state.input
    }
    this.setState({
      input: updatedInputObj
    });

    // set focus to field inputA
    this.setActiveInput('input1');
  }

  componentDidMount() {
    //console.log('CalcArea1x1 / compDidMount');
    //console.log('debug calcarea: ', this.props.appState);
  }

  componentDidUpdate(nextProps) {
    if (this.state.debugLevel === 2) { console.log('CalcArea1x1/componentDidUpdate: ', nextProps); };
    let state = this.props.keyboardState;
    if (state !== nextProps.keyboardState) {
      if (state === false) {
        this.setState({keyboardActive: 'keyboard inactive'});
      } else {
        this.setState({keyboardActive: 'keyboard active'});
      }
    }
  }

  // KEYBOARD
  onKeyPress(event) {
    if (this.state.debugLevel === 2) { console.log('CalcArea1x1 / onKeyPress: ', event); };
    if (event === '{enter}') {
      this.handleGoBtnClick();
    }
  }

  onChangeInput(event) {
    let inputVal = event.target.value;

    if (this.state.debugLevel === 2) { console.log('Keyboard/onChangeInput: ', inputVal, event); };
    let updatedInputObj = {
      ...this.state.input,
      [this.state.inputName]: inputVal
    };

    if (this.state.debugLevel === 3) { console.log('Keyboard/updatedInputObj: ', updatedInputObj); };
    this.setState(
      {input: updatedInputObj },
      () => {this.keyboard.setInput(inputVal);}
    );
  };

  onChangeAll(inputObj) {
    //let field = this.state.inputName;
    //let val = inputObj[field];

    // do validation
    //let patt = new RegExp(this.propsValidationFields[field].patt, 'g');
    //let notValid = patt.test(val);
    //console.log('CalcAreaRational/onChangeAll: ', field, val, notValid);

    // Dependend on the input field entry the state and helper text is set
    //let valPropField = this.propsValidationFields[field].valPropField;
    //let errPropField = this.propsValidationFields[field].errPropField;
    //let helpPropField = this.propsValidationFields[field].helpPropField;
    //let helpTxt = this.propsValidationFields[field].helpTxt;

    //notValid
    //? this.setState({
    //  [valPropField]: val,
    //  [errPropField]: notValid,
    //  [helpPropField]: '',
    //})
    //: this.setState({
    //  [valPropField]: val,
    //  [errPropField]: notValid,
    //  [helpPropField]: helpTxt,
    //});

    this.setState({
      input: inputObj
    });
    if (this.state.debugLevel === 3) { console.log("Keyboard/onChangeAll", inputObj); };
  };

  setActiveInput(inputName) {
    if (this.state.debugLevel === 2) { console.log('Keyboard/setActiveInput: ', inputName); };
    this.setState(
      {
        inputName: inputName,
        keyboardOpen: true
      },
      () => {
        if (this.state.debugLevel === 2) { console.log("Keyobard/Active input", inputName); };
      }
    );
  };

  // RENDER
  renderList(done) {
    //shorten transfered props name
    if (this.state.debugLevel === 2) { console.log('CalcArea1x1 / before render: ', this.props); };
    let newCalculation;
    let input;

    if (done) {
      return <h1>Geschafft...prima...</h1>;
    } else {
      try {
        newCalculation = this.props.calcState.newCalculations[0].calcStr;
        input = this.state.input;
      } catch (err) {
        if (this.state.debugLevel === 3) { console.log('err: ', err); };
        newCalculation = '';
        input= {'input1': ''};
      }
      return (
        <div>
          <div className="item1">
            <Filter1Icon />
            <p>los geht's: </p>
          </div>
          <div className="item2">
            <p className="calcStr">{newCalculation || ''}</p>
            <input
              type="text" id="input1" name="input1" className="calcInput"
              autoComplete="off"
              onFocus={() => this.setActiveInput('input1')}
              onChange={ e => this.handleInputChange(e)}
              onKeyPress={this.handleKeyPressed}
              value={input['input1'] || ''}
              inputMode="none" />
            <div className="goButton" onClick={this.handleGoBtnClick} >
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {

    return (
      <div className="divArea1x1" >
        <div className="calcBlock">
           {this.renderList(this.props.calcState.calcDone)}
        </div>
        <div className={this.state.keyboardActive}>
          <Keyboard
            keyboardRef={r => (this.keyboard = r)}
            layout={this.propsKeyboard}
            inputName={this.state.inputName}
            onKeyPress={button => this.onKeyPress(button)}
            onChangeAll={inputObj => this.onChangeAll(inputObj)} />
        </div>

      </div>
    );
  }
}

 // ref={this.isSolvedRef}>
 // ref={this.isVisRef} >
