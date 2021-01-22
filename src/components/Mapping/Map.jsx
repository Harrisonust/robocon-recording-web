import React, { Component } from "react";
import "../../styles/map-style.css";
import "../../styles/map-list-style.css";
import BasketButton from "./map-basket";

class Map extends Component {
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

export default Map;
