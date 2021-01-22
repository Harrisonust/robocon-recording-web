import React, { Component } from "react";
import "../../styles/map-list-style.css";

let scored_basket = "none";
let prev_scored_basket = "none";

class BasketButton extends Component {
  state = {
    points: 0,
    arrows: 0,
    state_button_reload: "btn",
    state_button_shoot: "disabled",
    state_button_scored: "disabled",
    state_button_missed: "disabled",
    state_button_type: "disabled",
    violations: 0,
    basket: [],
  };

  handleArrowReload = () => {
    this.setState({ arrows: this.state.arrows + 1 });
    let state;
    if (this.state.arrows < 0) {
      state = "disabled";
    } else {
      state = "btn";
    }
    this.setState({ state_button_shoot: state });
  };

  handleClickedShooting = () => {
    let state_scored;
    let state;
    let state_missed;
    let state_reload;
    state_scored = "btn";
    state = "disabled";
    state_missed = "btn";
    state_reload = "disabled";

    this.setState({ state_button_scored: state_scored });
    this.setState({ state_button_shoot: state });
    this.setState({ state_button_missed: state_missed });
    this.setState({ state_button_reload: state_reload });
    if (this.state.arrows > 0) {
      this.setState({ arrows: this.state.arrows - 1 });
    }
  };

  handleClickedScored = (named) => {
    if (named === "button_scored III") {
      let state;
      let state_reload;
      if (named !== prev_scored_basket) {
        if (this.state.basket.indexOf(named) > -1) {
          this.setState({ points: this.state.points + 4 });
        } else {
          this.setState({ points: this.state.points + 1 });
        }
      } else {
        alert("No Points!");
      }

      if (this.state.arrows > 0) {
        state = "btn";
      } else {
        state = "disabled";
      }
      state_reload = "btn";
      prev_scored_basket = named;
      this.state.basket.push(named);

      this.setState(this.state.basket);
      this.setState({ state_button_shoot: state });
      this.setState({ state_button_reload: state_reload });
    }
    scored_basket = named;
    let state_scored;
    let state_missed;
    state_scored = "disabled";
    state_missed = "disabled";

    this.setState({ state_button_scored: state_scored });
    this.setState({ state_button_missed: state_missed });

    if (named !== "button_scored III") {
      let state_type;
      state_type = "btn";
      this.setState({ state_button_type: state_type });
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
    let state;
    let state_type;
    let state_reload;
    state_reload = "btn";
    state_type = "disabled";

    if (this.state.arrows > 0) {
      state = "btn";
      this.setState({ state_button_shoot: state });
    }

    this.setState({ state_button_type: state_type });
    this.setState({ state_button_reload: state_reload });
  };

  handleClickedMissed = () => {
    let state_scored;
    let state_missed;
    let state_reload;
    state_scored = "disabled";
    state_missed = "disabled";
    state_reload = "btn";

    this.setState({ state_button_scored: state_scored });
    this.setState({ state_button_missed: state_missed });
    this.setState({ state_button_reload: state_reload });

    if (this.state.arrows > 0) {
      let state;
      if (this.state.arrows > 0) {
        state = "btn";
      } else {
        state = "disabled";
      }
      this.setState({ state_button_shoot: state });
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
          <span
            type="button"
            className="badge"
            style={{ fontSize: "200%", color: "white" }}
          >
            Score : {this.formatCount()}
          </span>
          <span
            type="button"
            className="badge"
            style={{ fontSize: "200%", color: "white" }}
          >
            Violation : {this.formatCountViolation()}
          </span>
        </div>
        <div>
          <button
            type="button"
            className={this.state.state_button_reload}
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
          <span
            type="button"
            className="badge"
            style={{ fontSize: "150%", color: "white" }}
          >
            Available Arrows : {this.formatCountArrow()}
          </span>
        </div>
        <div>
          <button
            type="button"
            className={this.state.state_button_shoot}
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
                    className={this.state.state_button_scored}
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
                    className={this.state.state_button_scored}
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
                    className={this.state.state_button_scored}
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
            className={this.state.state_button_type}
            id="button_type up"
            onClick={() => this.handleTypeOfBasket("button_type up")}
            style={{ width: "50%" }}
          >
            Type Up
          </button>
          <button
            type="button"
            className={this.state.state_button_type}
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
            className={this.state.state_button_missed}
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
            className="btn"
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
