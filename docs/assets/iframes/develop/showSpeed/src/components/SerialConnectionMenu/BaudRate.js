import { Select } from '@rmwc/select';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class BaudRate extends React.Component {
    render() {
        return <Select onChange={ (event) => this.props.updateBaudRate(event.target.value) } value={ this.props.currentBaudRate } label="Baud Rate" options={ this.props.baudRates } />;
    }
}