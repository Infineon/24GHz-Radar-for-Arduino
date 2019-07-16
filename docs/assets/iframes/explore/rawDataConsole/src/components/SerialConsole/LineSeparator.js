import { Select } from '@rmwc/select';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class LineSeparator extends React.Component {
    render() {
        return <Select onChange={ (event) => this.props.updateLineSeparator(event.target.value) } label="Line Separator" options={ this.props.lineSeparators } />;
    }
}