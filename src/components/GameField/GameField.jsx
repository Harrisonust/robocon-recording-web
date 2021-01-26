import React, { Component } from "react";
import "../../styles/GameField.css";
import GameFieldImage from "../../img/gamefield.png";
class GameField extends Component {
  render() {
    return (
      <div>
        <img
          className="GameFieldImage"
          src={GameFieldImage}
          alt="error"
          useMap="#GameField"
        />
        <map name="GameField">
          <area
            shape="circle"
            coords="201, 287, 10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(9)}
            hover="true"
            className="test"
          />
          <area
            shape="circle"
            coords="201,316,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(1)}
            hover="true"
          />
          <area
            shape="circle"
            coords="285,176,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(2)}
            hover="true"
          />

          <area
            shape="circle"
            coords="285,302,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(3)}
            hover="true"
          />
          <area
            shape="circle"
            coords="285,428,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(4)}
            hover="true"
          />
          <area
            shape="circle"
            coords="320,176,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(5)}
            hover="true"
          />
          <area
            shape="circle"
            coords="320,302,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(6)}
            hover="true"
          />

          <area
            shape="circle"
            coords="320,428,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(7)}
            hover="true"
          />
          <area
            shape="circle"
            coords="403,287,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(8)}
            hover="true"
          />
          <area
            shape="circle"
            coords="403,316,10"
            alt="buttonerror"
            href="#"
            onClick={() => this.props.ScoreHandler(0)}
            hover="true"
          />
        </map>

        <div>
          <p className="PotsStatus p0">
            {this.props.arrowNumbers[5]}
            <br />
          </p>
          <p className="PotsStatus p1">
            {this.props.arrowNumbers[0]} <br />
          </p>
          <p className="PotsStatus p2">
            {this.props.arrowNumbers[2]} <br />
          </p>
          <p className="PotsStatus p3">
            {this.props.arrowNumbers[4]} <br />
          </p>
          <p className="PotsStatus p4">
            {this.props.arrowNumbers[3]} <br />
          </p>
          <p className="PotsStatus p5">
            {this.props.arrowNumbers[7]} <br />
          </p>
          <p className="PotsStatus p6">
            {this.props.arrowNumbers[9]} <br />
          </p>
          <p className="PotsStatus p7">
            {this.props.arrowNumbers[8]} <br />
          </p>
          <p className="PotsStatus p8">
            {this.props.arrowNumbers[6]} <br />
          </p>
          <p className="PotsStatus p9">
            {this.props.arrowNumbers[1]} <br />
          </p>
        </div>
      </div>
    );
  }
}

export default GameField;
