import React, { Component } from "react";
import BasketButton from "./map-basket";
import "../../styles/map-style.css";
import "../../styles/map-list-style.css";

class Map extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="row">
          <div className="column left">
            <div className="grid-container">
              <BasketButton />
            </div>
          </div>
          <div className="column middle">MAP</div>
          <div className="column right"></div>
        </div>
      </div>
    );
  }
}

export default Map;
