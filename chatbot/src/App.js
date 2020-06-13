import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";
import Home from "./Components/Home/Home";
import "./App.css";

function initializeReactGA() {
  ReactGA.initialize("UA-162306407-1");
  ReactGA.pageview("/");
}
class App extends Component {

  render() {
    initializeReactGA();
    return (
      <BrowserRouter>
        <div className="App">
            <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
