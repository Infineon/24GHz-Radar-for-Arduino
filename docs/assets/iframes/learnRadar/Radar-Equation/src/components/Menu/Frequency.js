import { Select } from '@rmwc/select';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class Frequency extends React.Component {
    render() {
        return <Select onChange={ (event) => this.props.changeFrequence(event.target.value) } value={ this.props.currentFrequence } label="Frequence" options={ this.props.Frequences } />;
    }
}