import React, { Component } from "react";
import "../../styles/panel-list-style.css";

import Arrow from "../../img/arrow.png";

class BasketButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 0,
      arrows_on_rack: 5,
      arrows: 0,
      state_named_up: "none",
      state_named_down: "none",
      restart: false,
      scored_basket: "none",
      prev_scored_basket: "none",
      state_button_reload: this.props.start,
      state_button_shoot: "disabled",
      state_button_scored: "disabled",
      state_button_missed: "disabled",
      state_button_type: "disabled",
      violations: 0,
      basket: [0, 0, 0, 0, 0],
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.state.state_button_reload !== newProps.start) {
      this.setState({ state_button_reload: newProps.start });
    }

    if (this.state.restart !== newProps.restart) {
      if (newProps.restart === true) {
        console.log(newProps.restart);
        this.setState({
          points: 0,
          arrows: 0,
          restart: false,
          scored_basket: "none",
          prev_scored_basket: "none",
          state_button_reload: this.props.start,
          state_button_shoot: "disabled",
          state_button_scored: "disabled",
          state_button_missed: "disabled",
          state_button_type: "disabled",
          violations: 0,
          basket: [0, 0, 0, 0, 0],
        });
      }
    }
  }

  checkVictory = () => {
    if (
      this.state.basket[0] >= 2 &&
      this.state.basket[1] >= 2 &&
      this.state.basket[2] >= 2 &&
      this.state.basket[3] >= 2 &&
      this.state.basket[4] >= 2
    ) {
      this.props.handleGreatVictory("FINISHED", this.props.index);

      this.setState({ state_button_reload: "disabled" });
      this.setState({ state_button_shoot: "disabled" });
      this.setState({ state_button_scored: "disabled" });
      this.setState({ state_button_missed: "disabled" });
      this.setState({ state_button_type: "disabled" });
    } else {
      this.props.handleGreatVictory("NOT YET", this.props.index);
    }
  };

  handleArrowReload = () => {
    console.log(this.props.start);
    this.setState({ arrows: this.state.arrows + 1 });
    if (this.state.arrows_on_rack > 0)
      this.setState({ arrows_on_rack: this.state.arrows_on_rack - 1 });

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

    this.props.handleRecording("Arrow Reloaded", this.props.index);
  };

  handleReloadFailed = () => {
    if (this.state.arrows_on_rack > 0)
      this.setState({ arrows_on_rack: this.state.arrows_on_rack - 1 });
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

    this.props.handleRecording("Arrow Shoot", this.props.index);
  };

  handleClickedScored = (named) => {
    if (named === "button_scored III") {
      let state;
      let state_reload;
      if (named !== this.state.prev_scored_basket) {
        this.state.basket[4] += 1;
        this.setState(this.state.basket);
        if (this.state.basket[4] % 2 === 1 || this.state.basket[4] >= 5) {
          this.props.handleInfoCallBack(1, 4, this.props.index);
        } else if (this.state.basket[4] % 2 === 0 && this.state.basket[4] < 5) {
          this.props.handleInfoCallBack(3, 4, this.props.index);
        }

        this.props.handleRecording(
          "Arrow scored at " + named,
          this.props.index
        );
      } else {
        this.props.handleInfoCallBack(0, 4, this.props.index);
      }

      if (this.state.arrows > 0) {
        state = "btn";
      } else {
        state = "disabled";
      }

      state_reload = "btn";

      this.checkVictory();

      this.setState({ state_button_shoot: state });
      this.setState({ state_button_reload: state_reload });
      this.setState({ prev_scored_basket: named });
    }

    let state_scored;
    let state_missed;
    state_scored = "disabled";
    state_missed = "disabled";

    this.setState({ state_button_scored: state_scored });
    this.setState({ state_button_missed: state_missed });
    this.setState({ scored_basket: named });

    if (named !== "button_scored III") {
      let state_type;
      state_type = "btn";
      this.setState({ state_button_type: state_type });

      if (named === "button_scored I") {
        let state_named_up;
        let state_named_down;
        state_named_up = "Type right";
        state_named_down = "Type left";

        this.setState({ state_named_up: state_named_up });
        this.setState({ state_named_down: state_named_down });
      } else if (named === "button_scored II") {
        let state_named_up;
        let state_named_down;
        state_named_up = "Type up";
        state_named_down = "Type down";

        this.setState({ state_named_up: state_named_up });
        this.setState({ state_named_down: state_named_down });
      }
    }
  };

  handleTypeOfBasket = (named) => {
    let basket_index;

    if (
      this.state.scored_basket + " " + named !==
      this.state.prev_scored_basket
    ) {
      switch (this.state.scored_basket + " " + named) {
        case "button_scored I button_type up":
          this.state.basket[0] += 1;
          basket_index = 0;
          break;
        case "button_scored I button_type down":
          this.state.basket[1] += 1;
          basket_index = 1;
          break;
        case "button_scored II button_type up":
          this.state.basket[2] += 1;
          basket_index = 2;
          break;
        case "button_scored II button_type down":
          this.state.basket[3] += 1;
          basket_index = 3;
          break;
      }

      this.setState(this.state.basket);

      if (
        this.state.basket[basket_index] % 2 === 1 ||
        this.state.basket[basket_index] >= 5
      ) {
        this.props.handleInfoCallBack(1, basket_index, this.props.index);
      } else if (
        this.state.basket[basket_index] % 2 === 0 &&
        this.state.basket[basket_index] < 5
      ) {
        this.props.handleInfoCallBack(3, basket_index, this.props.index);
      }

      this.props.handleRecording("Arrow Scored at " + named, this.props.index);
    } else {
      switch (this.state.prev_scored_basket) {
        case "button_scored I button_type up":
          basket_index = 0;
          break;
        case "button_scored I button_type down":
          basket_index = 1;
          break;
        case "button_scored II button_type up":
          basket_index = 2;
          break;
        case "button_scored II button_type down":
          basket_index = 3;
          break;
      }

      this.props.handleInfoCallBack(0, basket_index, this.props.index);
    }

    this.setState({
      prev_scored_basket: this.state.scored_basket + " " + named,
    });

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

    this.checkVictory();
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

    this.props.handleRecording("Arrow Missed", this.props.index);
  };

  handleClickedViolation = () => {
    this.setState({ violations: this.state.violations + 1 });

    this.props.handleRecording("Violation", this.props.index);
  };
  ///here
  formatCount() {
    const arrows_on_rack = this.state.arrows_on_rack;
    return arrows_on_rack === 0 ? "Zero" : arrows_on_rack;
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
          {/*<span
            type="button"
            className="badge"
            style={{ fontSize: "200%", color: "white" }}
          >
            Arrows : {this.formatCount()}
          </span>*/}
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
            Arrows Reloaded
            <img
              src={Arrow}
              alt="arrow"
              style={{
                height: "40px",
                widht: "auto",
              }}
            />
            : {this.formatCountArrow()}
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
            {this.state.state_named_up}
          </button>
          <button
            type="button"
            className={this.state.state_button_type}
            id="button_type down"
            onClick={() => this.handleTypeOfBasket("button_type down")}
            style={{ width: "50%" }}
          >
            {this.state.state_named_down}
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
