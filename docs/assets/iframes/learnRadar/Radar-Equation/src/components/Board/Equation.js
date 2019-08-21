import { Select } from "@rmwc/select";
import React from "react";
import { observer } from "mobx-react";
import MathJax from "react-mathjax2";

//'+{this.props.RCS }+'

@observer
export default class Equation extends React.Component {
  constructor(props) {
    super(props);
  }
  color() {
    if (this.props.rslt > 0.05) {
      return "#FFFF00	";
    } else return "#bbb";
  }

  render() {
    const styles = {
      container: {
        background: this.color()
      }
    };

    const radar = this.props.radar;
    const time_delay = this.props.time_delay;
    
    return (
      <div className="detect">
        <span >
          <strong className="radar_equation">Radar Equation</strong>
        </span>
        <MathJax.Context input="ascii">
          <div>
            <MathJax.Node inline>{radar }</MathJax.Node>
            <br></br>
            <MathJax.Node inline>{this.props.rslt_db }</MathJax.Node>
          </div>
        </MathJax.Context>
        <br></br>
        <span>
          <strong className="time_delay">Time delay</strong>
        </span>
        <MathJax.Context input="ascii">
          <div>
            <MathJax.Node inline>{time_delay}</MathJax.Node>
          </div>
        </MathJax.Context>
      </div>
    );
  }
}
