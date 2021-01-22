import React, { Component } from "react";
import "../../styles/GameField.css";
import GameFieldImage from "../../img/GameField.png";
class GameField extends Component {
  state = {
    counter: 0,
  };
  handle = () => {
    console.log("test");
    this.setState({ counter: this.state.counter + 1 });
  };
  render() {
    return (
      <div>
        <p color="white">{this.state.counter}</p>
        <img
          className="GameFieldImage"
          src={GameFieldImage}
          alt="error"
          useMap="#GameField"
        />
        <map name="GameField">
          <area
            shape="circle"
            coords="252,359,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
            className="test"
          />
          <area
            shape="circle"
            coords="252,395,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="356,220,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="399,220,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="356,378,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="399,378,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="356,535,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="399,535,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="504,359,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
          <area
            shape="circle"
            coords="504,395,10"
            alt="buttonerror"
            href="#"
            onClick={this.handle}
            hover="true"
          />
        </map>
      </div>
    );
  }
}

export default GameField;
