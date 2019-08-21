import React from 'react';
import { observer } from "mobx-react"

@observer
export default class SlidingDoor extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDoor = this.toggleDoor.bind(this);
  }

  toggleDoor() {
    if (this.props.scs.speed > 0) {
      return '-50%';
    } else if (this.props.scs.speed < 0) {
      return '0%';
    } else {
      return '0%';
    }
  }

  render() {
    return (
      <div id="banner">
        <div class="doorHoverLeft" style={{left: this.toggleDoor()}}><span class="doorText">Welcome to </span></div>
        <div class="doorHoverRight" style={{right: this.toggleDoor()}}><span class="doorText">JuRADARassic Park</span></div>
      </div>
    );
  }
}