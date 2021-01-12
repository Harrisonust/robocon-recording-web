import React, { Component } from "react";
import "../../styles/timer-style.css";

class Timer extends Component {
  constructor() {
    super();
    this.countDownTimeMin = 1;
    this.countDownTimeSec = 10;
    this.countDownTimeMillSec = 10;
    this.state = {
      minute: this.countDownTimeMin,
      seconds: this.countDownTimeSec,
      millseconds: this.countDownTimeMillSec,
      timerEnable: false,
      counting: false,
    };
    this.setIntervalId = {};
    this.startTimer = this.startTimer.bind(this);
    this.timeCountDown = this.timeCountDown.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  timeCountDown() {
    if (this.state.counting === true) {
      this.setState({ millseconds: this.state.millseconds - 1 });

      if (this.state.millseconds === 0) {
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
    if (
      this.state.millseconds === 0 &&
      this.state.minute === 0 &&
      this.state.seconds === 0 &&
      this.state.counting === true
    ) {
      this.pauseTimer();
    }
  }
  startTimer() {
    if (this.state.counting === true) {
      this.pauseTimer();
      return;
    } else {
      if (
        this.state.timerEnable === false &&
        (this.state.millseconds !== 0 ||
          this.state.seconds !== 0 ||
          this.state.minute !== 0)
      ) {
        this.state.setIntervalId = setInterval(this.timeCountDown, 1000 / 60);
        this.setState({ timerEnable: true, counting: true });
      }
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

  render() {
    return (
      <div>
        <h1 class="timer-centered">
          <span className="badge badge-success ">
            {this.state.minute}:{this.state.seconds}'{this.state.millseconds}
          </span>
        </h1>
        <div class="timer-centered">
          <button
            onClick={this.startTimer}
            className="btn btn-primary badge-pill m-2 "
          >
            {this.state.counting && "Pause"}
            {!this.state.counting && "Start"}
          </button>

          <button
            onClick={this.resetTimer}
            className="btn btn-primary badge-pill m-2"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
