import { Select } from '@rmwc/select';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class Gain extends React.Component {
    render() {
        return <Select onChange={ (event) => this.props.changeGain(event.target.value) } value={ this.props.currentGain } label="Gain" options={ this.props.gains } />;
    }
}