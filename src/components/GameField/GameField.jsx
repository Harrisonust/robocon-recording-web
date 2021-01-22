import React, { Component } from "react";
import "../../styles/GameField.css";
import GameFieldImage from "../../img/GameField.png";
class GameField extends Component {
  state = {
    ourScore: 0,
    theirScore: 0,
    PotsStatusTable: {
      firstSingle: 0,
      firstDouble: 1,
      secondSingle: 2,
      secondDouble: 3,
      thirdSingle: 4,
      fourthSingle: 5,
    },
    PotsStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  ScoreHandler = (index) => {
    if (index < 5) {
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.firstSingle
      )
        this.setState({ ourScore: this.state.ourScore + 1 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.firstDouble
      )
        this.setState({ ourScore: this.state.ourScore + 3 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.secondSingle
      )
        this.setState({ ourScore: this.state.ourScore + 1 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.secondDouble
      )
        this.setState({ ourScore: this.state.ourScore + 3 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.thirdSingle
      )
        this.setState({ ourScore: this.state.ourScore + 1 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.fourthSingle
      )
        this.setState({ ourScore: this.state.ourScore + 1 });
    } else {
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.firstSingle
      )
        this.setState({ theirScore: this.state.theirScore + 1 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.firstDouble
      )
        this.setState({ theirScore: this.state.theirScore + 3 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.secondSingle
      )
        this.setState({ theirScore: this.state.theirScore + 1 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.secondDouble
      )
        this.setState({ theirScore: this.state.theirScore + 3 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.thirdSingle
      )
        this.setState({ theirScore: this.state.theirScore + 1 });
      if (
        this.state.PotsStatus[index] === this.state.PotsStatusTable.fourthSingle
      )
        this.setState({ theirScore: this.state.theirScore + 1 });
    }
    this.state.PotsStatus[index] = this.state.PotsStatus[index] + 1;
  };

  render() {
    return (
      <div>
        <p className="GameFieldCounter">Our Score:{this.state.ourScore}</p>
        <p className="GameFieldCounter">Their Score:{this.state.theirScore}</p>
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
            onClick={() => this.ScoreHandler(0)}
            hover="true"
            className="test"
          />
          <area
            shape="circle"
            coords="252,395,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(1)}
            hover="true"
          />
          <area
            shape="circle"
            coords="356,220,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(2)}
            hover="true"
          />
          <area
            shape="circle"
            coords="399,220,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(5)}
            hover="true"
          />
          <area
            shape="circle"
            coords="356,378,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(3)}
            hover="true"
          />
          <area
            shape="circle"
            coords="399,378,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(6)}
            hover="true"
          />
          <area
            shape="circle"
            coords="356,535,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(4)}
            hover="true"
          />
          <area
            shape="circle"
            coords="399,535,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(7)}
            hover="true"
          />
          <area
            shape="circle"
            coords="504,359,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(8)}
            hover="true"
          />
          <area
            shape="circle"
            coords="504,395,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(9)}
            hover="true"
          />
        </map>
      </div>
    );
  }
}

export default GameField;
