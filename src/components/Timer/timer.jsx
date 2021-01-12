import React, { Component } from "react";
import "../../styles/timer-style.css";

class Timer extends Component {
  state = { time: {}, seconds: 5 };
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  render() {
    return (
      <div>
        <h1 class="centered">
          <span className="badge badge-success ">text</span>
        </h1>
        <div>
          <button className="btn btn-primary badge-pill m-2">Sstart</button>
          <button className="btn btn-primary badge-pill m-2">Click</button>
          <button className="btn btn-primary badge-pill m-2">Click</button>
        </div>
      </div>
    );
  }
}

export default Timer;
