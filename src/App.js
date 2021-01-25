import React, { Component } from "react";

import "./styles/mainApp.css";
import "./styles/panel-style.css";
import "./styles/panel-list-style.css";

import Timer from "./components/Timer/timer";
import Panel from "./components/Panel/Panel";
import GameField from "./components/GameField/GameField";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
//init the timer by these value

class App extends Component {
  constructor(props) {
    super(props);

    //used for interval control
    this.setIntervalId = {};

    this.state = {
      // common state
      Score: [0, 0], // index 0 for our team and 1 for opponent

      //gamefield state
      PotsScoreTable: {
        firstSingle: 1,
        firstTwinning: 3,
        secondSingle: 1,
        secondTwinning: 3,
      },
      PotsStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      lastPots: -1,
      //panel state

      //timer state
      countDownTimeMin: 1,
      countDownTimeSec: 0,
      countDownTimeMillSec: 0,
      minute: 1,
      seconds: 0,
      millseconds: 0, //TODO
      timerEnable: false,
      counting: false,
    };
    //panel functions
    this.handleInfoCallBack = this.handleInfoCallBack.bind(this);

    //timer functions
    this.timeCountDown = this.timeCountDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.configUp = this.configUp.bind(this);
    this.configDown = this.configDown.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  //GameField functions start here
  ScoreHandler = (index) => {
    //updating score
    if (index === this.state.lastPots) {
      return;
    } else {
      this.setState({ lastPots: index });
    }
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

  //timer functions start here
  timeCountDown() {
    if (
      //check if the time is already 0
      //if so then call pause
      this.state.millseconds === 0 &&
      this.state.minute === 0 &&
      this.state.seconds === 0 &&
      this.state.counting === true
    )
      this.pauseTimer();
    else if (this.state.counting === true) {
      //handle normal count down
      this.setState({ millseconds: this.state.millseconds - 3 });

      if (this.state.millseconds <= 0) {
        if (this.state.seconds === 0) {
          if (this.state.minute === 0) {
            this.pauseTimer();
            return;
          }
          this.setState({ minute: this.state.minute - 1 });
          this.setState({ seconds: 60 });
        }
        this.setState({ seconds: this.state.seconds - 1 });
        this.setState({ millseconds: 60 });
      }
    }
  }
  startTimer() {
    //handle pause
    if (this.state.counting === true) {
      this.pauseTimer();
    } else {
      //handle start or resume
      this.setState({
        setIntervalId: setInterval(this.timeCountDown, 1000 / 20),
        timerEnable: true,
        counting: true,
      });
    }
    // console.log(this.state.counting);
  }
  pauseTimer() {
    this.setState({
      counting: false,
      timerEnable: false,
    });
    clearInterval(this.state.setIntervalId);
  }
  resetTimer() {
    this.setState({
      counting: false,
      timerEnable: false,
      minute: this.state.countDownTimeMin,
      seconds: this.state.countDownTimeSec,
      millseconds: this.state.countDownTimeMillSec,
    });
    clearInterval(this.state.setIntervalId);
  }
  configUp() {
    if (this.state.minute >= 60) {
      this.setState({ minute: 60, seconds: 0 });
    } else if (this.state.seconds + 1 >= 60) {
      this.setState({ minute: this.state.minute + 1, seconds: 0 });
    } else this.setState({ seconds: this.state.seconds + 1 });
  }
  configDown() {
    if (this.state.seconds - 1 < 0 && this.state.minute === 0) {
      this.setState({ minute: 0, seconds: 0 });
    } else if (this.state.seconds - 1 < 0) {
      this.setState({ minute: this.state.minute - 1, seconds: 59 });
    } else this.setState({ seconds: this.state.seconds - 1 });
  }
  setMode(event) {
    if (event.target.checked) {
      console.log("true");
      this.setState({ countDownTimeMin: 3 }, () => {
        this.resetTimer();
      });
    } else {
      console.log("false");
      this.setState({ countDownTimeMin: 1 }, () => {
        this.resetTimer();
      });
    }
  }

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
            <Timer
              minute={this.state.minute}
              seconds={this.state.seconds}
              millseconds={this.state.millseconds}
              countDownTimeMin={this.state.countDownTimeMin}
              countDownTimeSec={this.state.countDownTimeSec}
              countDownTimeMillSec={this.countDownTimeMillSec}
              timerEnable={this.state.timerEnable}
              counting={this.state.counting}
              timeCountDown={this.timeCountDown}
              startTimer={this.startTimer}
              pauseTimer={this.pauseTimer}
              resetTimer={this.resetTimer}
              configUp={this.configUp}
              configDown={this.configDown}
              setMode={this.setMode}
            />
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
