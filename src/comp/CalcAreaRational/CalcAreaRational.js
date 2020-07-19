import React from 'react';
//import logo from '../logo.svg';
import './CalcAreaRational.scss';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';

import ValidationTextFields from '../ValidationTextFields/ValidationTextFields';

export class CalcAreaRational extends React.Component {
  constructor(props) {
    super(props);

    // STATE
    this.state = {
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
      input: {inputA: '',},
      inputName: 'inputA',
      keyboardActive: 'keyboard inactive'
    }

    this.propsFields = {
      'inputA': {
        next: 'inputB',
      },
      'inputB': {
        next: 'inputC',
      },
      'inputC': {
        next: 'inputD',
      },
      'inputD': {
        next: 'inputA',
      },
    }

    this.propsValidationFields = {
      inputA: {
        valPropField: 'validationTextFieldAValue',
        errPropField: 'validationTextFieldAError',
        helpPropField: 'validationTextFieldAHelperTxt',
        helpTxt: '+/- Ziffern',
        patt: '^([+-]{0,1}[,0-9]{1,3})$',
      },
      inputB: {
        valPropField: 'validationTextFieldBValue',
        errPropField: 'validationTextFieldBError',
        helpPropField: 'validationTextFieldBHelperTxt',
        helpTxt: '+/-/*',
        patt: '^([+-x]{1})$',
      },
      inputC: {
        valPropField: 'validationTextFieldCValue',
        errPropField: 'validationTextFieldCError',
        helpPropField: 'validationTextFieldCHelperTxt',
        helpTxt: 'Ziffern',
        patt: '^([,0-9]{1,3})$',
      },
      inputD: {
        valPropField: 'validationTextFieldDValue',
        errPropField: 'validationTextFieldDError',
        helpPropField: 'validationTextFieldDHelperTxt',
        helpTxt: '+/- Ziffern',
        patt: '^([+-]{0,1}[,0-9]{1,3})$',
      },
    }

    // item specific props
    this.propsKeyboard = {
      'default': [
        '0 1 2 3 4 5 ,',
        '5 6 7 8 9 0 ( )',
        'tabs - + * / {bksp} {enter}',
      ],
    }

    // REFERENCES
    this.isVisRef = React.createRef();
    this.isSolvedRef = React.createRef();
    this.fallRef = React.createRef();
    this.isInputABCRef = React.createRef();

    // BINDINGS
    this.handleGoBtnClick = this.handleGoBtnClick.bind(this);
    // Validation
    this.handleChange = this.handleChange.bind(this);
    // KEYBOARD
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChangeAll = this.onChangeAll.bind(this);
    this.setActiveInput = this.setActiveInput.bind(this);
  }

  handleGoBtnClick () {
    // start evaluation and update in DivCalculations
    let val = this.state.input['inputD'];
    if (val === undefined) {val = '0'};
    this.props.goButton(val);

    // delete old textfield entries
    console.log('handleGoBtnClick/delete all: ', this.state.input);
    let keys = Object.keys(this.state.input);
    let updatedInputObj;
    let inputVal = '';
    keys.map(key => {
      this.state.input[key] = inputVal;
      this.keyboard.setInput('', key);
    })
    updatedInputObj = {
      ...this.state.input
    }
    console.log('Keyboard/updatedInputObj: ', updatedInputObj);
    this.setState({
      input: updatedInputObj
    });

    // set focus to field inputA
    this.setActiveInput('inputA');
  }

  onKeyPress(event) {
    if (this.state.debugLevel >= 2) {console.log('DivRational/Key Pressed: ', event)};
    if (event.key === "Enter" || event === '{enter}') {
      this.handleGoBtnClick();
      try {
        event.preventDefault();
      } catch (err) {
        console.log(err);
      }
    }
    if (event === 'tabs') {
      let next = this.propsFields[this.state.inputName].next;
      console.log('tab: ', next, this.state.inputName, this.propsFields);
      this.setActiveInput(next);
      try {
        event.preventDefault();
      } catch (err) {
        console.log(err);
      }
    }
  }

  handleChange(event, field) {
    let val = event.target.value;
    //let valA_2 = this.state.newCalculations[0].calcStr[0]+this.state.newCalculations[0].calcStr[1];

    // do validation
    let patt = new RegExp(this.propsValidationFields[field].patt, 'g');
    let valid = patt.test(val);
    console.log('CalcAreaRational/handleChange: ', field, val, valid);

    // Dependend on the input field entry the state and helper text is set
    let valPropField = this.propsValidationFields[field].valPropField;
    let errPropField = this.propsValidationFields[field].errPropField;
    let helpPropField = this.propsValidationFields[field].helpPropField;
    let helpTxt = this.propsValidationFields[field].helpTxt;

    valid
    ? this.setState({
      [valPropField]: val,
      [errPropField]: valid,
      [helpPropField]: '',
    })
    : this.setState({
      [valPropField]: val,
      [errPropField]: valid,
      [helpPropField]: helpTxt,
    });

    // update state.input
    let updatedInputObj = {
      ...this.state.input,
      [this.state.inputName]: val
    };

    console.log('handleChange/updatedInputObj: ', updatedInputObj);
    this.setState(
      {input: updatedInputObj },
      () => {this.keyboard.setInput(val);}
    );
  }

  componentDidUpdate(nextProps) {
    console.log('CalcAreaRational/componentDidUpdate: ', nextProps);
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
  onChangeInput(event) {
    let inputVal = event.target.value;

    console.log('Keyboard/onChangeInput: ', inputVal, event);
    let updatedInputObj = {
      ...this.state.input,
      [this.state.inputName]: inputVal
    };

    console.log('Keyboard/updatedInputObj: ', updatedInputObj);
    this.setState(
      {input: updatedInputObj },
      () => {this.keyboard.setInput(inputVal);}
    );
  };

  onChangeAll(inputObj) {
    let field = this.state.inputName;
    let val = inputObj[field];

    // do validation
    let patt = new RegExp(this.propsValidationFields[field].patt, 'g');
    let notValid = patt.test(val);
    console.log('CalcAreaRational/onChangeAll: ', field, val, notValid);

    // Dependend on the input field entry the state and helper text is set
    let valPropField = this.propsValidationFields[field].valPropField;
    let errPropField = this.propsValidationFields[field].errPropField;
    let helpPropField = this.propsValidationFields[field].helpPropField;
    let helpTxt = this.propsValidationFields[field].helpTxt;

    notValid
    ? this.setState({
      [valPropField]: val,
      [errPropField]: notValid,
      [helpPropField]: '',
    })
    : this.setState({
      [valPropField]: val,
      [errPropField]: notValid,
      [helpPropField]: helpTxt,
    });

    this.setState({
      input: inputObj
    });
    console.log("Keyboard/onChangeAll", inputObj);
  };

  setActiveInput(inputName) {
    console.log('Keyboard/setActiveInput: ', inputName);
    this.setState(
      {
        inputName: inputName,
        keyboardOpen: true
      },
      () => {
        console.log("Keyobard/Active input", inputName);
      }
    );
  };

  // RENDER
  render() {
    return (
      <div className="calcAreaRational" >
        <div className="blockCalc">
          <div className="item1" >
            <Filter1Icon />
            <p className="col-1">los geht's: </p>
            <p className="col-2 calcStr">({this.props.calcState.newCalculations[0].calcStr[0]}{this.props.calcState.newCalculations[0].calcStr[1]})</p>
            <p className="col-3 calcStr">{this.props.calcState.newCalculations[0].calcStr[2]}</p>
            <p className="col-4 calcStr">({this.props.calcState.newCalculations[0].calcStr[3]}{this.props.calcState.newCalculations[0].calcStr[4]})</p>
            <p className="col-5 calcStr">{this.props.calcState.newCalculations[0].calcStr[5]}</p>
          </div>
          <div className="item2" >
            <Filter2Icon />
            <p className="col-1">Klammer auflösen: </p>
            <div className="item2_1" ref={this.isInputABCRef} >
              <ValidationTextFields
                  class="col-2 calcStr"
                  name="inputA"
                  helperText={this.state.validationTextFieldAHelperTxt}
                  error={!this.state.validationTextFieldAError}
                  onFocus={() => this.setActiveInput('inputA')}
                  onChange={e => this.handleChange(e, 'inputA')}
                  input={this.state.input || ''} />
              <ValidationTextFields
                  class="col-3 calcStr"
                  name="inputB"
                  helperText={this.state.validationTextFieldBHelperTxt}
                  error={!this.state.validationTextFieldBError}
                  onFocus={() => this.setActiveInput('inputB')}
                  onChange={e => this.handleChange(e, 'inputB')}
                  input={this.state.input || ''} />
              <ValidationTextFields
                  class="col-4 calcStr"
                  name="inputC"
                  helperText={this.state.validationTextFieldCHelperTxt}
                  error={!this.state.validationTextFieldCError}
                  onFocus={() => this.setActiveInput('inputC')}
                  onChange={e => this.handleChange(e, 'inputC')}
                  input={this.state.input || ''} />
            </div>
            <p className="col-5 calcStr">=</p>
          </div>
          <div className="item3" ref={this.isSolvedRef} >
            <Filter3Icon />
            <p className="col-1">Zusammenrechnen: </p>
            <ValidationTextFields
                class="col-2 calcStr"
                name="inputD"
                helperText={this.state.validationTextFieldDHelperTxt}
                error={!this.state.validationTextFieldDError}
                onFocus={() => this.setActiveInput('inputD')}
                onChange={e => this.handleChange(e, 'inputD')}
                input={this.state.input || ''}
                onKeyPress={this.onKeyPress} />
            <img src="./images/go-button.svg" alt="" onClick={this.handleGoBtnClick} className="goButton" />
          </div>
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
