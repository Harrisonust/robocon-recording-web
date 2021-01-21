import React, { Component } from "react";
import "../../styles/map-list-style.css";

let scored_basket = "none";
let prev_scored_basket = "none";

class BasketButton extends Component {
  state = {
    points: 0,
    arrows: 0,
    violations: 0,
    basket: [],
  };

  handleArrowReload = () => {
    this.setState({ arrows: this.state.arrows + 1 });
    if (this.state.arrows < 0) {
      document.getElementById("button_shoot").className = "disabled";
    } else {
      document.getElementById("button_shoot").className = "btn";
    }
  };

  handleClickedShooting = () => {
    document.getElementById("button_scored I").className = "btn";
    document.getElementById("button_scored II").className = "btn";
    document.getElementById("button_scored III").className = "btn";
    document.getElementById("button_missed").className = "btn";
    document.getElementById("button_shoot").className = "disabled";
    if (this.state.arrows > 0) {
      this.setState({ arrows: this.state.arrows - 1 });
    }
  };

  handleClickedScored = (named) => {
    if (named === "button_scored III") {
      if (named !== prev_scored_basket) {
        if (this.state.basket.indexOf(named) > -1) {
          this.setState({ points: this.state.points + 4 });
        } else {
          this.setState({ points: this.state.points + 1 });
        }
      }
      prev_scored_basket = named;
      this.state.basket.push(named);
      this.setState(this.state.basket);
    }
    scored_basket = named;
    document.getElementById("button_scored I").className = "disabled";
    document.getElementById("button_scored II").className = "disabled";
    document.getElementById("button_scored III").className = "disabled";
    document.getElementById("button_missed").className = "disabled";

    if (this.state.arrows > 0) {
      document.getElementById("button_shoot").className = "btn";
    }

    if (named !== "button_scored III") {
      document.getElementById("button_type up").className = "btn";
      document.getElementById("button_type down").className = "btn";
    }
  };

  handleTypeOfBasket = (named) => {
    if (scored_basket + " " + named !== prev_scored_basket) {
      if (this.state.basket.indexOf(scored_basket + " " + named) > -1) {
        this.setState({ points: this.state.points + 4 });
      } else {
        this.setState({ points: this.state.points + 1 });
      }
      this.state.basket.push(scored_basket + " " + named);
      this.setState(this.state.basket);
    }

    prev_scored_basket = scored_basket + " " + named;
    document.getElementById("button_type up").className = "disabled";
    document.getElementById("button_type down").className = "disabled";
  };

  handleClickedMissed = () => {
    document.getElementById("button_scored I").className = "disabled";
    document.getElementById("button_scored II").className = "disabled";
    document.getElementById("button_scored III").className = "disabled";
    document.getElementById("button_missed").className = "disabled";
    if (this.state.arrows > 0) {
      document.getElementById("button_shoot").className = "btn";
    }
  };

  handleClickedViolation = () => {
    this.setState({ violations: this.state.violations + 1 });
  };

  formatCount() {
    const points = this.state.points;
    return points === 0 ? "Zero" : points;
  }

  formatCountArrow() {
    const arrows = this.state.arrows;
    return arrows === 0 ? "Zero" : arrows;
  }

  formatCountViolation() {
    const violations = this.state.violations;
    return violations === 0 ? "Zero" : violations;
  }

  render() {
    return (
      <div className="grid-container">
        <div>
          <span className="badge" style={{ fontSize: "200%" }}>
            Score : {this.formatCount()}
          </span>
          <span className="badge" style={{ float: "right", fontSize: "200%" }}>
            Violation : {this.formatCountViolation()}
          </span>
        </div>
        <div>
          <button
            type="button"
            className="btn"
            onClick={() => this.handleArrowReload()}
            style={{ borderRadius: 20, width: "50%" }}
          >
            Arrow Reload
          </button>
          <button
            type="button"
            className="btn"
            style={{ borderRadius: 20, width: "50%" }}
          >
            Arrow Reload Failed
          </button>
        </div>
        <div>
          <span className="badge" style={{ fontSize: "150%" }}>
            Available Arrows : {this.formatCountArrow()}
          </span>
        </div>
        <div>
          <button
            type="button"
            className="disabled"
            id="button_shoot"
            onClick={() => this.handleClickedShooting()}
            style={{ borderRadius: 20, width: "100%" }}
          >
            Shooting
          </button>
        </div>
        <div>
          <table className="buttons">
            <tbody>
              <tr>
                <td>
                  <button
                    type="button"
                    className="disabled"
                    id="button_scored I"
                    onClick={() => this.handleClickedScored("button_scored I")}
                    style={{ borderRadius: 20 }}
                  >
                    I-type Scored
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="disabled"
                    id="button_scored II"
                    onClick={() => this.handleClickedScored("button_scored II")}
                    style={{ borderRadius: 20 }}
                  >
                    II-type Scored
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="disabled"
                    id="button_scored III"
                    onClick={() =>
                      this.handleClickedScored("button_scored III")
                    }
                    style={{ borderRadius: 20 }}
                  >
                    III-type Scored
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            type="button"
            className="disabled"
            id="button_type up"
            onClick={() => this.handleTypeOfBasket("button_type up")}
            style={{ width: "50%" }}
          >
            Type Up
          </button>
          <button
            type="button"
            className="disabled"
            id="button_type down"
            onClick={() => this.handleTypeOfBasket("button_type down")}
            style={{ width: "50%" }}
          >
            Type Down
          </button>
        </div>
        <div>
          <button
            type="button"
            className="disabled"
            id="button_missed"
            onClick={() => this.handleClickedMissed()}
            style={{ borderRadius: 20, width: "100%" }}
          >
            Missed
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => this.handleClickedViolation()}
            style={{
              borderRadius: 20,
              width: "50%",
              fontSize: "150%",
              color: "blue",
              backgroundColor: "red",
            }}
          >
            Violation
          </button>
        </div>
      </div>
    );
  }
}

export default BasketButton;
