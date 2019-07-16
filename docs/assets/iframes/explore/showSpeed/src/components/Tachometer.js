import React from 'react';
import { observer } from "mobx-react"

@observer
export default class Tachometer extends React.Component {
  constructor(props) {
    super(props);

    this.log = this.log.bind(this);
    this.rotation = this.rotation.bind(this);
  }

  log() {
    console.log(this.props.scs.speed);
  }

  rotation() {
    // console.log('rotating to '+ Math.round(Math.abs(this.props.scs.speed) / 20 * 240 - 120, 2));
    return 'rotate(' + Math.round(Math.abs(this.props.scs.speed) / 20 * 240 - 120, 2) + 'deg)';
  }

  render() {
    return (
      <div>
        <div class="container">
          <div id="tachometer">
            <div class="ii">
              <div><b><span class="num_1">0</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_2">1</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_3">2</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_4">3</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_5">4</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_6">5</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_7">6</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_8">7</span></b></div>
              <div><b></b></div>
              <div><b><span class="num_9">8</span></b></div>
            </div>
            <div id="redline"></div>
            <div class="line" style={{transform: this.rotation()}}></div>
            <div class="pin"><div class="inner"></div></div>
            <div id="speed" class="num_speed">{Math.abs(this.props.scs.speed).toFixed(2)}</div>
            <div id="unit" class="num_speed">km/h</div>
          </div>
        </div>
      </div>
    );
  }
}