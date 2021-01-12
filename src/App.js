import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Timer from "./components/Timer/timer";
import Map from "./components/Mapping/Map";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Timer />
        <Map />
      </React.Fragment>
    );
  }
}

export default App;
