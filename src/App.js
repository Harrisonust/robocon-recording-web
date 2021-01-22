import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Timer from "./components/Timer/timer";
import Map from "./components/Mapping/Map";
import "./styles/map-list-style.css";
import "./styles/mainApp.css";
import GameField from "./components/GameField/GameField";
class App extends Component {
  render() {
    return (
      <div className="mainPageStyle">
        <Timer />
        <div className="horizontal-container">
          <Map />
          <GameField />
        </div>
      </div>
    );
  }
}

export default App;
