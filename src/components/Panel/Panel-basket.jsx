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
      type: "",
      state_named_up: "none",
      state_named_down: "none",
      restart: false,
      scored_basket: "none",
      prev_scored_basket: "none",
      state_button_reload: this.props.start,
      state_button_scored: "disabled",
      state_button_missed: "disabled",
      state_button_type: "disabled",
      violations: 0,
      basket: [0, 0, 0, 0, 0],
    };

    this.handleInput = this.handleInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.start !== newProps.start) {
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
      this.setState({ state_button_scored: "disabled" });
      this.setState({ state_button_missed: "disabled" });
      this.setState({ state_button_type: "disabled" });
    } else {
      this.props.handleGreatVictory("NOT YET", this.props.index);
    }
  };

  handleArrowReload = () => {
    this.setState({ arrows: this.state.arrows + 1 });
    if (this.state.arrows_on_rack > 0)
      this.setState({ arrows_on_rack: this.state.arrows_on_rack - 1 });

    let state_reload;
    if (this.state.arrows > 3) {
      state_reload = "disabled";
    } else {
      state_reload = "button";
    }

    console.log(this.state.arrows);
    console.log(state_reload);

    this.setState({ state_button_reload: state_reload });

    this.handleClickedShooting();

    this.props.handleRecording("Arrow Reloaded", this.props.index);
  };

  handleReloadFailed = () => {
    if (this.state.arrows_on_rack > 0)
      this.setState({ arrows_on_rack: this.state.arrows_on_rack - 1 });
  };

  handleClickedShooting = () => {
    let state_scored;
    let state_missed;
    state_scored = "button";
    state_missed = "button";

    this.setState({ state_button_scored: state_scored });
    this.setState({ state_button_missed: state_missed });
    this.props.handleRecording("Arrow Shoot", this.props.index);
  };

  handleClickedScored = (named) => {
    let state_reload;
    let index = this.nameToIndex(named);
    if (named !== this.state.prev_scored_basket) {
      this.state.basket[index] += 1;
      this.setState(this.state.basket);
      if (this.state.basket[index] % 2 === 1 || this.state.basket[index] >= 5) {
        this.props.handleInfoCallBack(1, index, this.props.index);
      } else if (
        this.state.basket[index] % 2 === 0 &&
        this.state.basket[index] < 5
      ) {
        this.props.handleInfoCallBack(3, index, this.props.index);
      }

      this.props.handleRecording("Arrow scored at " + named, this.props.index);
    } else {
      this.props.handleInfoCallBack(0, index, this.props.index);
    }

    state_reload = "button";

    this.checkVictory();

    this.setState({ state_button_reload: state_reload });
    this.setState({ prev_scored_basket: named });

    this.setState({ arrows: this.state.arrows - 1 });

    let state_scored;
    let state_missed;
    console.log(this.state.arrows);
    if (this.state.arrows <= 1) {
      console.log("Here");
      state_scored = "disabled";
      state_missed = "disabled";
      this.setState({ state_button_scored: state_scored });
      this.setState({ state_button_missed: state_missed });
    }

    this.setState({ scored_basket: named });
  };

  nameToIndex = (name) => {
    switch (name) {
      case "button_scored I":
        return 0;
        break;
      case "button_scored II":
        return 1;
        break;
      case "button_scored III":
        return 2;
        break;
      case "button_scored IV":
        return 3;
        break;
      case "button_scored V":
        return 4;
        break;
    }
  };

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      type: e.target.value,
    });
    console.log(this.state.type);
  };

  onKeyPress = (e) => {
    e.preventDefault();
    if (e.key === 13) {
      console.log("enter");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.arrows > 0 &&
      (this.state.type === "1" ||
        this.state.type === "2" ||
        this.state.type === "3" ||
        this.state.type === "4" ||
        this.state.type === "5")
    ) {
      if (this.state.type === "1") {
        this.handleClickedScored("button_scored I");
      } else if (this.state.type === "2") {
        this.handleClickedScored("button_scored II");
      } else if (this.state.type === "3") {
        this.handleClickedScored("button_scored III");
      } else if (this.state.type === "4") {
        this.handleClickedScored("button_scored IV");
      } else if (this.state.type === "5") {
        this.handleClickedScored("button_scored V");
      }
    }
    this.setState({
      type: "",
    });
  };

  handleClickedMissed = () => {
    this.setState({ arrows: this.state.arrows - 1 });

    if (this.state.arrows <= 1) {
      let state_scored;
      let state_missed;
      state_scored = "disabled";
      state_missed = "disabled";

      this.setState({ state_button_scored: state_scored });
      this.setState({ state_button_missed: state_missed });
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
        <form onSubmit={this.handleSubmit}>
          <input
            style={{ width: "90%" }}
            name="Shooting"
            type="text"
            value={this.state.type}
            placeholder="Pot type (ex: 1, 2, 3, 4, 5)"
            onChange={this.handleInput}
          />
        </form>
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
                    I-Type
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
                    II-Type
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
                    III-Type
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className={this.state.state_button_scored}
            id="button_scored IV"
            onClick={() => this.handleClickedScored("button_scored IV")}
            style={{ width: "35%", marginRight: "15px", borderRadius: 20 }}
          >
            IV-Type
          </button>
          <button
            type="button"
            className={this.state.state_button_scored}
            id="button_scored V"
            onClick={() => this.handleClickedScored("button_scored V")}
            style={{ width: "35%", borderRadius: 20 }}
          >
            V-Type
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
            className="button"
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
