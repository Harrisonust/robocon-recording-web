import React, { Component } from "react";
import "../../styles/GameField.css";
import GameFieldImage from "../../img/gamefield.png";
class GameField extends Component {
  point_spec = {
    x1: 200,
    x2: 284,
    x3: 320,
    x4: 403,
    y1: 176,
    y2: 287,
    y3: 316,
    y4: 428,
    rad: 80,
  };

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
    if (this.state.PotsStatus[index] === 6) return;
    var newList = [];
    for (var x = 0; x < this.state.PotsStatus.length; x++) {
      if (x === index) newList.push(this.state.PotsStatus[x] + 1);
      else newList.push(this.state.PotsStatus[x]);
    }
    this.setState({ PotsStatus: newList });
  };

  render() {
    return (
      <div>
        <img
          className="GameFieldImage"
          src={GameFieldImage}
          alt="error"
          useMap="#GameField"
        />
        <map name="GameField">
          <area
            shape="circle"
            coords="201, 287, 10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(0)}
            hover="true"
            className="test"
          />
          <area
            shape="circle"
            coords="201,316,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(1)}
            hover="true"
          />
          <area
            shape="circle"
            coords="285,176,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(2)}
            hover="true"
          />

          <area
            shape="circle"
            coords="285,302,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(3)}
            hover="true"
          />
          <area
            shape="circle"
            coords="285,428,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(4)}
            hover="true"
          />
          <area
            shape="circle"
            coords="320,176,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(5)}
            hover="true"
          />
          <area
            shape="circle"
            coords="320,302,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(6)}
            hover="true"
          />

          <area
            shape="circle"
            coords="320,428,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(7)}
            hover="true"
          />
          <area
            shape="circle"
            coords="403,287,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(8)}
            hover="true"
          />
          <area
            shape="circle"
            coords="403,316,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.ScoreHandler(9)}
            hover="true"
          />
        </map>
        <div>
          <p className="GameFieldScore">Our Score:{this.state.ourScore}</p>
          <p className="GameFieldScore">Their Score:{this.state.theirScore}</p>
        </div>
        <div>
          <p className="PotsStatus p0">{this.state.PotsStatus[0]}</p>
          <p className="PotsStatus p1">{this.state.PotsStatus[1]}</p>
          <p className="PotsStatus p2">{this.state.PotsStatus[2]}</p>
          <p className="PotsStatus p3">{this.state.PotsStatus[3]}</p>
          <p className="PotsStatus p4">{this.state.PotsStatus[4]}</p>
          <p className="PotsStatus p5">{this.state.PotsStatus[5]}</p>
          <p className="PotsStatus p6">{this.state.PotsStatus[6]}</p>
          <p className="PotsStatus p7">{this.state.PotsStatus[7]}</p>
          <p className="PotsStatus p8">{this.state.PotsStatus[8]}</p>
          <p className="PotsStatus p9">{this.state.PotsStatus[9]}</p>
        </div>
      </div>
    );
  }
}

export default GameField;
