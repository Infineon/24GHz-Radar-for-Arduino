import { Select } from "@rmwc/select";
import React from "react";
import { observer } from "mobx-react";

@observer
export default class Sensibility extends React.Component {
  render() {
    return (
      <div class="row">

          <div>
            <label for="tentacles">Sensibility:</label>
            <input type="number" min="-1" max="1" step="0.1" onChange={ (event) => this.props.updateSensibility(event.target.value) } sensibility={ this.props.sensibility }></input>

          </div>
          
          
          <div>
            <label for="tentacles">Threshold:</label>
            <input type="number" min="-3" max="3" step="0.5" onChange={ (event) => this.props.updateThreshold(event.target.value) } threshold={ this.props.threshold }></input>
          </div>
      
          <div>
            <label for="tentacles">Timer:</label>
            <input type="number" min="1" max="5" step="1" onChange={ (event) => this.props.updateTimer(event.target.value) } timer={ this.props.timer }></input>
          </div>

      </div>
    );
  }
}
