import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Timer from "./components/Timer/timer";
import Panel from "./components/Panel/Panel";
import "./styles/panel-list-style.css";
import "./styles/mainApp.css";
import GameField from "./components/GameField/GameField";
class App extends Component {
  render() {
    return (
      <div className="mainPageStyle">
        <div className="header-timer">
          <Timer />
        </div>
        <div className="horizontal-container">
          <Panel />
          <GameField />
          <Panel />
        </div>
      </div>
    );
  }
}

export default App;
