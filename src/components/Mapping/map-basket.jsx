import React, { Component } from "react";
import "../../styles/map-list-style.css";

class BasketButton extends Component {
  state = {
    points: 0,
  };

  handleClickedShooting = (named) => {
    document.getElementById(named).disabled = false;
  };

  handleClickedScored = (named) => {
    document.getElementById(named).disabled = true;
    this.setState({ points: this.state.points + 1 });
  };

  render() {
    return (
      <div>
        <span className="btn btn-primary" style={{ fontSize: 50 }}>
          {this.state.points}
        </span>
        <table className="buttons">
          <tbody>
            <tr>
              <td>
                <button
                  type="button"
                  id="button I"
                  onClick={() => this.handleClickedShooting("button_scored I")}
                  style={{ borderRadius: 20 }}
                >
                  I-type basket shooting
                </button>
              </td>
              <td>
                <button
                  type="button"
                  id="button II"
                  onClick={() => this.handleClickedShooting("button_scored II")}
                  style={{ borderRadius: 20 }}
                >
                  II-type basket shooting
                </button>
              </td>
              <td>
                <button
                  type="button"
                  id="button III"
                  onClick={() =>
                    this.handleClickedShooting("button_scored III")
                  }
                  style={{ borderRadius: 20 }}
                >
                  III-type basket shooting
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="buttons">
          <tbody>
            <tr>
              <td>
                <button
                  type="button"
                  id="button_scored I"
                  onClick={() => this.handleClickedScored("button_scored I")}
                  style={{ borderRadius: 20 }}
                >
                  I-type basket scored
                </button>
              </td>
              <td>
                <button
                  type="button"
                  id="button_scored II"
                  onClick={() => this.handleClickedScored("button_scored II")}
                  style={{ borderRadius: 20 }}
                >
                  II-type basket scored
                </button>
              </td>
              <td>
                <button
                  type="button"
                  id="button_scored III"
                  onClick={() => this.handleClickedScored("button_scored III")}
                  style={{ borderRadius: 20 }}
                >
                  III-type basket scored
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  formatCount() {
    const { points } = this.state.points;
    return points === 0 ? "Zero" : points;
  }
}

export default BasketButton;
