import { Select } from '@rmwc/select';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class Object extends React.Component {
    render() {
        return <Select onChange={ (event) => this.props.changeObject(event.target.value) } value={ this.props.currentObject } label="Target" options={ this.props.objects } />;
    }
}