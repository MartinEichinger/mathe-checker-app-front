import React from 'react';

import './App.scss';
import {Nav} from '../Nav/Nav';
import {Footer1Row} from '../Footer1Row/Footer1Row';
import {DivCalc1x1} from '../DivCalc1x1/DivCalc1x1';
import {DivRational} from '../DivRational/DivRational';

import SimpleSelect from '../SimpleSelect/SimpleSelect';
import CheckboxLabels from '../CheckboxLabels/CheckboxLabels';

class App extends React.Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      selectSelected: '',
      checkboxChecks: [true, false, false, false],
      debugLevel: 1,
    }

    // props
    this.propsNav = {
      img: {
        src: "./images/Logo-MatheChecker.png",
        txt: "Mathe Checker"
      },
      items: [
              {
                name: 'About',
                link: '#about'
              },
              ]
    };

    this.propsSelect = {
      labels: ['Such Dir was aus...',
              'Kopfrechnen - kleines 1x1',
              'Kopfrechnen - großes 1x1',
              'Rationale Zahlen (+ / - / x / Kommazahlen)'],
    }

    this.propsCheckbox = {
      visibility: {
                    '': 'invis',
                    '1': 'vis',
                    '2': 'vis',
                    '3': 'vis',
                  },
      labels: [
                [],
                ['(+) bis 10', '(-) bis 10', '(x) bis 10', '(/) bis 10'],
                ['(+) bis 100', '(-) bis 100', '(x) bis 25', '(/) bis 10'],
                ['(+/-) bis 25', '(x) bis 25', '(+/-) mit Kommazahlen', '(x) mit Kommazahlen'],
              ],
      values: [
                [1, 1, 1, 1],
                [10, 10, 10, 10],
                [100, 100, 25, 10],
                [25, 25, 25, 25],
              ]
    }

    this.propsCalc = {
      visibility: {
        '': 'invis',
        '1': 'vis',
        '2': 'vis',
        '3': 'vis',
      },
    }

    this.propsFooter = {
        block11Img: '',
        block11Txt1: 'Copyright 2020',
        block12Img1: './images/Logo-MatheChecker.png',
        block13Txt: [
          {
            type: 'footer2',
            name: 'Contact',
            link: '#'
          }
        ],
      };

    // bindings
    console.log(this.state.debugLevel >= 2 ? 'App/Bindings: done' : '');
    this.handleNewSelection = this.handleNewSelection.bind(this);
    this.handleNewChecks = this.handleNewChecks.bind(this);
    this.renderList = this.renderList.bind(this);

    // references
    console.log(this.state.debugLevel >= 2 ? 'App/references: done' : '');
    this.isVisCheckbox = React.createRef();
    this.isVisCalc1x1 = React.createRef();
  }

  handleNewSelection(select) {
    console.log(this.state.debugLevel >= 2 ? `App/handleNewSelection/select1: ${select}, ${this.propsSelect}, ${this.state}` : '');
    if (this.state.selectSelected !== select) {
      this.setState({
        selectSelected: select
      });
    }

    // unhide checkbox
    const isVisCheckbox = this.isVisCheckbox.current;
    let checkVisCheck = this.propsCheckbox.visibility[select];
    console.log(this.state.debugLevel >= 2 ? `App/handleNewSelection/checkbox: ${isVisCheckbox}, ${select}, ${checkVisCheck}` : '');

    try {
      if (isVisCheckbox.classList.contains('isInvis') && checkVisCheck === 'vis') {
          isVisCheckbox.classList.toggle('isInvis');
      } else if (!isVisCheckbox.classList.contains('isInvis') && checkVisCheck === 'invis') {
          isVisCheckbox.classList.toggle('isInvis');
      }
    }
    catch (err) {
      console.log('App/handleNewSelection/Err/checkbox: ',err.message);
    }

    // unhide calculation area
    const isVisCalc1x1 = this.isVisCalc1x1.current;
    let checkVisCalc = this.propsCalc.visibility[select];
    console.log(this.state.debugLevel >= 2 ? `App/handleNewSelection/calculation: ${isVisCalc1x1}, ${checkVisCalc}` : '');

    try {
      if (isVisCalc1x1.classList.contains('isInvis') && checkVisCalc === 'vis') {
          isVisCalc1x1.classList.toggle('isInvis');
      } else if (!isVisCalc1x1.classList.contains('isInvis') && checkVisCalc === 'invis') {
          isVisCalc1x1.classList.toggle('isInvis');
      }
    }
    catch (err) {
      console.log('App/handleNewSelection/Err/calculation: ',err.message);
    }
  }

  handleNewChecks(checks) {
    console.log(this.state.debugLevel >= 2 ? `handleNewChecks/checks: ${checks}, ${this.state}` : '');
    if (this.state.checkboxChecks !== checks) {
      this.setState({
        checkboxChecks: checks
      });
    }

  }

  renderList(select) {
    console.log(this.state.debugLevel >= 2 ? `App/renderList/select: ${select}` : '');
    if (select === '') {
      return <p></p>;
    } else if (select === 1 || select === 2) {
      return <DivCalc1x1 propsCheckbox={this.propsCheckbox} propsSelect={this.propsSelect} selections={this.state} />;
    } else if (select === 3) {
      return <DivRational propsCheckbox={this.propsCheckbox} selections={this.state} />;
    }
  }

  render() {
    console.log(this.state.debugLevel >= 2 ? 'App: start rendering...' : '');
    return (
      <div className="App">
        <Nav propsDiv={this.propsNav} />
        <div className="simpleSelect" >
          <SimpleSelect props={this.propsSelect} onChange={this.handleNewSelection} selections={this.state} />
          <div className="isInvis" ref={this.isVisCheckbox}>
            <CheckboxLabels propsCheckbox={this.propsCheckbox} propsSelect={this.propsSelect} selections={this.state} onChange={this.handleNewChecks} />
          </div>
        </div>
        <div className="isInvis" ref={this.isVisCalc1x1}>
          {this.renderList(this.state.selectSelected)}
        </div>
        <Footer1Row propsDiv={this.propsFooter} />
      </div>
    );
  }
}

export default App;
