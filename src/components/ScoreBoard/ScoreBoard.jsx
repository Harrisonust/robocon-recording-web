import React, { Component } from "react";
import "../../styles/ScoreBoard.css";
//this is the parent class for Panel and GameField

class ScoreBoard extends Component {
  state = {};
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="scoreboard">Score: {this.props.Score}</p>
      </div>
    );
  }
}

export default ScoreBoard;
