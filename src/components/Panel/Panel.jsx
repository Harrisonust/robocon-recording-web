import React, { Component } from "react";
import "../../styles/panel-style.css";
import "../../styles/panel-list-style.css";
import BasketButton from "./Panel-basket";

class Panel extends Component {
  constructor(props) {
    super(props);
    this.timer = React.createRef();
  }

  state = {};

  render() {
    return (
      <div>
        <BasketButton
          Score={this.props.Score}
          time={this.props.time}
          handleClickedScored={this.props.handleClickedScored}
          handleTypeOfBasket={this.props.handleTypeOfBasket}
          index={this.props.index}
        />
      </div>
    );
  }
}

export default Panel;
