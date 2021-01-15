import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Timer from "./components/Timer/timer";
import Map from "./components/Mapping/map";
import "./styles/map-list-style.css";

class App extends Component {
  render() {
    return (
      <div>
        <Timer />

        <Map />
      </div>
    );
  }
}

export default App;
