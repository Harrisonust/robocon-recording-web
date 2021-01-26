import React, { Component } from "react";

import "./styles/mainApp.css";
import "./styles/panel-style.css";
import "./styles/panel-list-style.css";
import "./styles/recording.css";

import Timer from "./components/Timer/timer";
import Panel from "./components/Panel/Panel";
import GameField from "./components/GameField/GameField";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";

import Time from "./components/Timer/time";

class App extends Component {
  constructor(props) {
    super(props);

    //used for interval control
    this.intervaID = {};

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
      arrowNumbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      lastPots: [-1, -1],

      //timer state
      countDownInitTime: new Time(1, 0, 0),
      nowTime: new Time(1, 0, 0),
      timerEnable: false,
      counting: false,

      //panel state
      restart: false,

      //recording state
      blue: [],
      red: [],
    };

    //panel functions
    this.handleInfoCallBack = this.handleInfoCallBack.bind(this);
    this.handleGreatVictory = this.handleGreatVictory.bind(this);
    this.handleRecording = this.handleRecording.bind(this);

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
    //updating arrow numbers
    var newArrowNumber = [];
    for (var x = 0; x < this.state.arrowNumbers.length; x++) {
      if (x === index) newArrowNumber.push(this.state.arrowNumbers[x] + 1);
      else newArrowNumber.push(this.state.arrowNumbers[x]);
    }
    this.setState({ arrowNumbers: newArrowNumber });

    //filter out consecutive shot in same pot and update the last pot index
    if (
      (index < 5 && index === this.state.lastPots[0]) ||
      (index >= 5 && index === this.state.lastPots[1])
    ) {
      return;
    } else {
      let nowPots = [this.state.lastPots[0], this.state.lastPots[1]];
      if (index < 5) nowPots[0] = index;
      else nowPots[1] = index;
      this.setState({ lastPots: nowPots });
    }

    //updating pots status
    var newPotsStatus = [];
    for (var x = 0; x < this.state.PotsStatus.length; x++) {
      if (x === index) newPotsStatus.push(this.state.PotsStatus[x] + 1);
      else newPotsStatus.push(this.state.PotsStatus[x]);
    }
    this.setState({ PotsStatus: newPotsStatus });

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
  };

  //Panel functions start here
  handleInfoCallBack = (Data, basket_index, index) => {
    var newScore = [this.state.Score[0], this.state.Score[1]];
    var newArrowNumber = [];
    var newPotsStatus = [];

    if (Data !== 0) {
      if (index === 0) {
        newScore[0] += Data;
      }
      if (index === 1) {
        basket_index += 5;
        newScore[1] += Data;
      }

      var newPotsStatus = [];
      for (var x = 0; x < this.state.PotsStatus.length; x++) {
        if (x === basket_index)
          newPotsStatus.push(this.state.PotsStatus[x] + 1);
        else newPotsStatus.push(this.state.PotsStatus[x]);
      }
      this.setState({ PotsStatus: newPotsStatus });
    } else if (Data === 0) {
      if (index === 1) {
        basket_index += 5;
      }
    }

    for (var x = 0; x < this.state.arrowNumbers.length; x++) {
      if (x === basket_index)
        newArrowNumber.push(this.state.arrowNumbers[x] + 1);
      else newArrowNumber.push(this.state.arrowNumbers[x]);
    }
    this.setState({ arrowNumbers: newArrowNumber });

    this.setState({ Score: newScore });
  };

  handleGreatVictory = (Named, index) => {
    if (Named === "FINISHED") {
      if (index === 0) {
        alert("GREAT VICTORY FOR BLUE TEAM");
      } else if (index === 1) {
        alert("GREAT VICTORY FOR RED TEAM");
      }
      this.pauseTimer();
    }
  };

  handleRecording = (Named, index) => {
    if (Named !== "") {
      if (index === 0) {
        this.state.blue.push(
          Named +
            " at this time: " +
            this.state.nowTime.minutes +
            ":" +
            this.state.nowTime.seconds +
            ":" +
            this.state.nowTime.milliseconds
        );
        this.setState(this.state.blue);
      } else if (index === 1) {
        this.state.red.push(
          Named +
            " at this time: " +
            this.state.nowTime.minutes +
            ":" +
            this.state.nowTime.seconds +
            ":" +
            this.state.nowTime.milliseconds
        );
        console.log(this.state.red);

        this.setState(this.state.red);
      }
    }
  };

  timeCountDown() {
    var { minutes, seconds, milliseconds } = this.state.nowTime;
    if (
      //check if the time is already 0
      //if so then call pause
      milliseconds === 0 &&
      minutes === 0 &&
      seconds === 0 &&
      this.state.counting === true
    )
      this.pauseTimer();
    else if (this.state.counting === true) {
      //handle normal count down
      this.setState({
        nowTime: new Time(minutes, seconds, milliseconds - 3),
      });

      if (milliseconds <= 0) {
        if (seconds === 0) {
          if (minutes === 0) {
            this.pauseTimer();
            return;
          }
          this.setState({
            nowTime: new Time(minutes - 1, 60, milliseconds),
          });
        }
        this.setState({
          nowTime: new Time(
            this.state.nowTime.minutes,
            this.state.nowTime.seconds - 1,
            60
          ),
        });
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
        intervaID: setInterval(this.timeCountDown, 1000 / 20),
        timerEnable: true,
        counting: true,
      });

      this.setState({ restart: false });
    }
  }
  pauseTimer() {
    this.setState({
      counting: false,
      timerEnable: false,
    });
    clearInterval(this.state.intervaID);
  }
  resetTimer() {
    var { minutes, seconds, milliseconds } = this.state.countDownInitTime;
    this.setState({
      counting: false,
      timerEnable: false,
      nowTime: new Time(minutes, seconds, milliseconds),
      Score: [0, 0],
      blue: [],
      red: [],
    });
    clearInterval(this.state.intervaID);

    this.setState({ restart: true });
  }
  configUp() {
    var { minutes, seconds, milliseconds } = this.state.nowTime;

    if (minutes >= 60) {
      this.setState({ nowTime: new Time(60, 0, this.nowTime.milliseconds) });
    } else if (seconds + 1 >= 60) {
      this.setState({
        nowTime: new Time(minutes + 1, 0, milliseconds),
      });
    } else {
      this.setState({
        nowTime: new Time(minutes, seconds + 1, milliseconds),
      });
    }
  }
  configDown() {
    var { minutes, seconds, milliseconds } = this.state.nowTime;

    if (seconds - 1 < 0 && minutes === 0) {
      this.setState({
        nowTime: new Time(0, 0, milliseconds),
      });
    } else if (seconds - 1 < 0) {
      this.setState({
        nowTime: new Time(minutes - 1, 59, milliseconds),
      });
    } else {
      this.setState({
        nowTime: new Time(minutes, seconds - 1, milliseconds),
      });
    }
  }
  setMode(event) {
    var { minutes, seconds, milliseconds } = this.state.countDownInitTime;
    if (event.target.checked) {
      this.setState(
        {
          countDownInitTime: new Time(3, seconds, milliseconds),
        },
        () => {
          this.resetTimer();
        }
      );
    } else {
      this.setState(
        {
          countDownInitTime: new Time(1, seconds, milliseconds),
        },
        () => {
          this.resetTimer();
        }
      );
    }
  }

  render() {
    return (
      <div className="mainPageStyle">
        <div className="row">
          <div className="column left" style={{ textAlign: "center" }}>
            {/*<ScoreBoard
              className="ScoreBoardCenter"
              Score={this.state.Score[0]}
              index={0}
            />*/}
            <span
              type="button"
              className="badge"
              style={{ fontSize: "400%", color: "blue" }}
            >
              Score : {this.state.Score[0]}
            </span>
          </div>
          <div className="column middle">
            <Timer
              nowTime={this.state.nowTime}
              countDownInitTime={this.state.countDownInitTime}
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
            {/*<ScoreBoard
              className="ScoreBoardCenter"
              Score={this.state.Score[1]}
              index={1}
            />*/}
            <span
              type="button"
              className="badge"
              style={{ fontSize: "400%", color: "red" }}
            >
              Score : {this.state.Score[1]}
            </span>
          </div>
        </div>
        <div className="horizontal-container">
          <div style={{ color: "white", textAlign: "center" }}>
            <Panel
              score={this.state.Score[0]}
              handleInfoCallBack={this.handleInfoCallBack}
              handleGreatVictory={this.handleGreatVictory}
              handleRecording={this.handleRecording}
              start={this.state.timerEnable}
              restart={this.state.restart}
              PotsStatus={this.state.PotsStatus}
              index={0}
            />
            Blue Recording
            <div className="divStyle">
              {this.state.blue.map((blue) => (
                <p>{blue}</p>
              ))}
            </div>
          </div>
          <GameField
            Score={this.state.Score}
            PotsStatus={this.state.PotsStatus}
            arrowNumbers={this.state.arrowNumbers}
            ScoreHandler={this.ScoreHandler}
          />
          <div style={{ color: "white", textAlign: "center" }}>
            <Panel
              score={this.state.Score[1]}
              handleInfoCallBack={this.handleInfoCallBack}
              handleGreatVictory={this.handleGreatVictory}
              handleRecording={this.handleRecording}
              start={this.state.timerEnable}
              restart={this.state.restart}
              index={1}
            />
            Red Recording
            <div className="divStyle">
              {this.state.red.map((red) => (
                <p>{red}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
