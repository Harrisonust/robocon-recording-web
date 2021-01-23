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
        <BasketButton />
      </div>
    );
  }
}

export default Panel;
