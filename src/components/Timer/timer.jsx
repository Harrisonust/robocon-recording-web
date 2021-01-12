import React, { Component } from "react";
import "../../styles/timer-style.css";

class Timer extends Component {
  //constructor
  constructor() {
    super();

    //init the timer by these value
    this.countDownTimeMin = 10;
    this.countDownTimeSec = 4;
    this.countDownTimeMillSec = 10;

    //Timer state
    this.state = {
      minute: this.countDownTimeMin,
      seconds: this.countDownTimeSec,
      millseconds: this.countDownTimeMillSec,
      timerEnable: false,
      counting: false,
    };

    //used for interval control
    this.setIntervalId = {};

    /*bind function to timer*/

    this.timeCountDown = this.timeCountDown.bind(this);

    //used for both starting or resuming the timer
    this.startTimer = this.startTimer.bind(this);

    this.pauseTimer = this.pauseTimer.bind(this);

    this.resetTimer = this.resetTimer.bind(this);

    //used for rendering UI
    this.renderTimer = this.renderTimer.bind(this);
    this.renderButton = this.renderButton.bind(this);

    this.getTimeString = this.getTimeString.bind(this);
  }

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
      this.state.setIntervalId = setInterval(this.timeCountDown, 1000 / 20);
      this.setState({ timerEnable: true, counting: true });
    }
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
      minute: this.countDownTimeMin,
      seconds: this.countDownTimeSec,
      millseconds: this.countDownTimeMillSec,
    });
    clearInterval(this.state.setIntervalId);
  }

  renderTimer() {
    let className = "badge badge-";
    if (
      this.state.millseconds === 0 &&
      this.state.minute === 0 &&
      this.state.seconds === 0
    ) {
      className += "danger";
    } else {
      className += "success";
    }
    return className;
  }

  renderButton() {
    let className = "btn btn-lg badge-pill m-2 btn-";
    if (this.state.counting) {
      className += "danger";
    } else {
      className += "primary";
    }
    return className;
  }

  getTimeString() {
    let minUp = parseInt(this.state.minute / 10);
    let minDown = parseInt(this.state.minute % 10);
    let secUp = parseInt(this.state.seconds / 10);
    let secDown = parseInt(this.state.seconds % 10);
    let millsecUp = parseInt(this.state.millseconds / 10);
    let millsecDown = parseInt(this.state.millseconds % 10);
    return (
      minUp.toString(10) +
      minDown.toString(10) +
      ":" +
      secUp.toString(10) +
      secDown.toString(10) +
      "'" +
      millsecUp.toString(10) +
      millsecDown.toString(10)
    );
  }

  render() {
    return (
      <div>
        <h1 class="timer-centered">
          <span className={this.renderTimer()}>{this.getTimeString()}</span>
        </h1>
        <div class="timer-centered">
          <button onClick={this.startTimer} className={this.renderButton()}>
            {this.state.counting && "Pause"}
            {!this.state.counting && "Start"}
          </button>

          <button
            onClick={this.resetTimer}
            className="btn btn-warning badge-pill m-2 btn-lg"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
