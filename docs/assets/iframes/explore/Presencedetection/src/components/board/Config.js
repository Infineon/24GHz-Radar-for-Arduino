import React from 'react';
import { observer } from "mobx-react"


@observer
export default class Config extends React.Component {
    render() {
        return (
            <div>
                <input className="range_sensibility" type='range' min={3.4} max={6.7} step={0.1}    orient="vertical" onChange={ (event) => this.props.changesensibility(event.target.value) }  value={this.props.sensibility} ref="inp"  />
                <input className="range_threshold" type='range' min={10} max={100} step={10}    orient="vertical"      onChange={ (event) => this.props.changethreshold(event.target.value) } value={this.props.threshold} ref="inp"  />
            </div>
        );
    }
}