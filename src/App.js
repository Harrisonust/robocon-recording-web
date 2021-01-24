import React, { Component } from "react";

import "./styles/mainApp.css";
import "./styles/panel-style.css";
import "./styles/panel-list-style.css";

import Timer from "./components/Timer/timer";
import Panel from "./components/Panel/Panel";
import GameField from "./components/GameField/GameField";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // common state
      Score: [0, 0], // index 0 for our team and 1 for opponent
      time: 0,

      //gamefield state
      PotsScoreTable: {
        firstSingle: 1,
        firstTwinning: 3,
        secondSingle: 1,
        secondTwinning: 3,
      },
      PotsStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      //panel state
    };

    this.handleInfoCallBack = this.handleInfoCallBack.bind(this);
  }

  //GameField functions start here
  ScoreHandler = (index) => {
    //updating score
    var newScore = [this.state.Score[0], this.state.Score[1]];

    if (index < 5) {
      if (this.state.PotsStatus[index] === 0) {
        newScore[0] += this.state.PotsScoreTable.firstSingle;
      } else if (this.state.PotsStatus[index] === 1) {
        newScore[0] += this.state.PotsScoreTable.firstTwinning;
      } else if (this.state.PotsStatus[index] === 2) {
        newScore[0] += this.state.PotsScoreTable.secondSingle;
      } else if (this.state.PotsStatus[index] === 3) {
        newScore[0] += this.state.PotsScoreTable.secondTwinning;
      } else {
        newScore[0] += 1;
      }
    } else {
      if (this.state.PotsStatus[index] === 0) {
        newScore[1] += this.state.PotsScoreTable.firstSingle;
      } else if (this.state.PotsStatus[index] === 1) {
        newScore[1] += this.state.PotsScoreTable.firstTwinning;
      } else if (this.state.PotsStatus[index] === 2) {
        newScore[1] += this.state.PotsScoreTable.secondSingle;
      } else if (this.state.PotsStatus[index] === 3) {
        newScore[1] += this.state.PotsScoreTable.secondTwinning;
      } else {
        newScore[1] += 1;
      }
    }
    this.setState({ Score: newScore });

    //updating pots
    var newList = [];
    for (var x = 0; x < this.state.PotsStatus.length; x++) {
      if (x === index) newList.push(this.state.PotsStatus[x] + 1);
      else newList.push(this.state.PotsStatus[x]);
    }
    this.setState({ PotsStatus: newList });
  };

  //Panel functions start here
  handleInfoCallBack = (Data, index) => {
    var newScore = [this.state.Score[0], this.state.Score[1]];

    if (index === 0) {
      newScore[0] += Data;
    }
    if (index === 1) {
      newScore[1] += Data;
    }

    this.setState({ Score: newScore });
  };

  render() {
    return (
      <div className="mainPageStyle">
        <div className="row">
          <div className="column left" style={{ textAlign: "center" }}>
            <ScoreBoard
              className="ScoreBoardCenter"
              Score={this.state.Score[0]}
            />
          </div>
          <div className="column middle">
            <Timer score={this.state.score} time={this.state.time} />
          </div>
          <div className="column right" style={{ textAlign: "center" }}>
            <ScoreBoard
              className="ScoreBoardCenter"
              Score={this.state.Score[1]}
            />
          </div>
        </div>
        <div className="horizontal-container">
          <div>
            <Panel
              score={this.state.Score[0]}
              handleInfoCallBack={this.handleInfoCallBack}
              index={0}
            />
          </div>
          <GameField
            Score={this.state.Score}
            PotsStatus={this.state.PotsStatus}
            ScoreHandler={this.ScoreHandler}
          />
          <div>
            <Panel
              score={this.state.Score[1]}
              handleInfoCallBack={this.handleInfoCallBack}
              index={1}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
