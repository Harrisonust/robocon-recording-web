import React, { Component } from "react";
import "../../styles/timer-style.css";

class Timer extends Component {
  //constructor
  constructor(props) {
    super(props);

    //Timer state
    this.state = {};

    /*bind function to timer*/

    this.renderTimer = this.renderTimer.bind(this);
    this.renderButton = this.renderButton.bind(this);

    this.getTimeString = this.getTimeString.bind(this);
  }

  renderTimer() {
    let className = "badge badge-";
    if (
      this.props.nowTime.millseconds === 0 &&
      this.props.nowTime.minutes === 0 &&
      this.props.nowTime.seconds === 0
    ) {
      className += "danger";
    } else {
      className += "primary";
    }
    return className;
  }

  renderButton() {
    let className = "btn btn-lg badge-pill m-2 btn-";
    if (this.props.counting) {
      className += "danger";
    } else {
      className += "primary";
    }
    return className;
  }

  getTimeString() {
    let minUp = parseInt(this.props.nowTime.minutes / 10);
    let minDown = parseInt(this.props.nowTime.minutes % 10);
    let secUp = parseInt(this.props.nowTime.seconds / 10);
    let secDown = parseInt(this.props.nowTime.seconds % 10);
    let millsecUp = parseInt(this.props.nowTime.millseconds / 10);
    let millsecDown = parseInt(this.props.nowTime.millseconds % 10);
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
        <div className="timer-centered">
          <span className={this.renderTimer()}>{this.getTimeString()}</span>
          <div>
            <button
              onClick={() => this.props.configUp()}
              className=" timer-adjustbutton-vertical btn-primary"
            >
              +
            </button>
            <button
              onClick={() => this.props.configDown()}
              className="timer-adjustbutton-vertical btn-primary"
            >
              -
            </button>
          </div>
        </div>
        <div className="timer-button-center">
          <button
            onClick={() => this.props.startTimer()}
            className={this.renderButton()}
          >
            {this.props.counting && "Pause"}
            {!this.props.counting && "Start"}
          </button>

          <button
            onClick={() => this.props.resetTimer()}
            className="btn btn-warning badge-pill m-2 btn-lg"
          >
            Reset
          </button>
          <label className="switch">
            <input
              type="checkbox"
              onClick={(event) => this.props.setMode(event)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default Timer;
