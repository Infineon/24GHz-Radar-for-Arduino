import { Checkbox } from '@rmwc/checkbox';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class AgentFound extends React.Component {
    render() {
        return (
            <Checkbox
                disabled
                checked={this.props.status || false}>
                Agent Detected
            </Checkbox>
        );
    }
}

