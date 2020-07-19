import React from "react";
import { Nav } from "../Nav/Nav";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import Calc from "../Calc/Calc";
import { Login } from "../Login/Login";
import { Footer1Row } from "../Footer1Row/Footer1Row";
import NotFound from "./../NotFound/notFound";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      // 1: Funktionsaufrufe, 2: übergebene Parameter, 3: Debugdetails
      debugLevel: 1,
      schoolClass: 1,
      difficulty: "easy",
      keyboardActive: false,
    };
  }

  handleKeyboardActive = (keyboardActive) => {
    if (this.state.debugLevel >= 2)
      console.log(`App / handleKeyboardActive: ${keyboardActive}`);
    if (this.state.keyboardActive !== keyboardActive)
      this.setState({ keyboardActive });
  };

  render() {
    if (this.state.debugLevel >= 2) console.log("App/start rendering...");
    const { schoolClass, difficulty } = this.state;

    return (
      <div className="App">
        <Nav onChange={this.handleKeyboardActive} />
        <main className="container">
          <div className="content">
            <Switch>
              <Route
                path="/calc"
                render={(props) => (
                  <Calc
                    {...props}
                    keyboardActive={this.state.keyboardActive}
                    userData={{ schoolClass, difficulty }}
                  />
                )}
              />
              <Route path="/login" component={Login} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Home} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
        <Footer1Row />
      </div>
    );
  }
}

export default App;
