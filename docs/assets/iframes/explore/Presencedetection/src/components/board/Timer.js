import React from 'react';
import { observer } from "mobx-react"


@observer
export default class Timer extends React.Component {
    render() {
        return (
            <div >
              
            
            <input className="range_timer" type="number" min="1" max="8" step="1" onChange={ (event) => this.props.updateTimer(event.target.value) } value={ this.props.temps }></input>
            <span className="timer">Timer(sec):</span>
            </div>
        );
    }
}




