import React, { Component } from "react";
import "../../styles/panel-style.css";
import "../../styles/panel-list-style.css";
import BasketButton from "./Panel-basket";

class Panel extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    start: false,
    initial: "disabled",
    restart: false,
    PotsStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.state.start !== newProps.start) {
      if (newProps.start === true) {
        this.setState({ initial: "button" });
        this.setState({ start: newProps.start });
      } else if (newProps.start === false) {
        this.setState({ initial: "disabled" });
        this.setState({ start: newProps.start });
      }
    }

    if (this.state.restart !== newProps.restart) {
      if (newProps.restart === true) {
        this.setState({ restart: true });
      } else if (newProps.restart === false) {
        this.setState({ restart: false });
      }
    }
  }

  render() {
    return (
      <div>
        <BasketButton
          Score={this.props.Score}
          handleInfoCallBack={this.props.handleInfoCallBack}
          handleGreatVictory={this.props.handleGreatVictory}
          handleRecording={this.props.handleRecording}
          start={this.state.initial}
          restart={this.state.restart}
          index={this.props.index}
        />
      </div>
    );
  }
}

export default Panel;
