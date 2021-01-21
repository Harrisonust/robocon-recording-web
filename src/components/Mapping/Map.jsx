import React, { Component } from "react";
import "../../styles/map-style.css";
import "../../styles/map-list-style.css";
import BasketButton from "./map-basket";

class Map extends Component {
  state = {
    points: 0,
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="column left">
            <BasketButton />
          </div>
          <div className="column middle">MAP</div>
          <div className="column right"></div>
        </div>
      </div>
    );
  }
}

export default Map;
