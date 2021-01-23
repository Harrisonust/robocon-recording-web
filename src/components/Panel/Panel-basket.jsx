import React, { Component } from "react";
import "../../styles/panel-list-style.css";

class BasketButton extends Component {
  state = {
    arrows: 0,
    scored_basket: "none",
    prev_scored_basket: "none",
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
    let state_reload;
    if (this.state.arrows > 3) {
      state_reload = "disabled";
    } else {
      state_reload = "btn";
    }

    if (this.state.arrows < 0) {
      state = "disabled";
    } else {
      state = "btn";
    }

    this.setState({ state_button_reload: state_reload });
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
  ///here
  formatCount() {
    const points = this.props.Score;
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
          {/* <span
            type="button"
            className="badge"
            style={{ fontSize: "200%", color: "white" }}
          >
            Score : {this.formatCount()}
          </span> */}
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
                    onClick={() =>
                      this.props.handleClickedScored(
                        "button_scored I",
                        this.props.index
                      )
                    }
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
                    onClick={() =>
                      this.props.handleClickedScored(
                        "button_scored II",
                        this.props.index
                      )
                    }
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
                      this.props.handleClickedScored(
                        "button_scored III",
                        this.props.index
                      )
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
            onClick={() =>
              this.props.handleTypeOfBasket("button_type up", this.props.index)
            }
            style={{ width: "50%" }}
          >
            Type Up
          </button>
          <button
            type="button"
            className={this.state.state_button_type}
            id="button_type down"
            onClick={() =>
              this.props.handleTypeOfBasket(
                "button_type down",
                this.props.index
              )
            }
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
