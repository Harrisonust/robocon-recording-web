import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Timer from "./components/Timer/timer";
import Map from "./components/Mapping/Map";
import "./styles/mainApp.css";
class App extends Component {
  render() {
    return (
      <div className="body">
        <Timer />
        {/* <Timer />
        <Timer />
        <Timer />
        <Timer /> */}
        <Map />
      </div>
    );
  }
}

export default App;
