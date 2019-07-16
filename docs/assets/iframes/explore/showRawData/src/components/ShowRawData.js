import React from 'react';
import { observer } from "mobx-react"
import SerialConnectionMenu from './SerialConnectionMenu';
import IQplot from './IQplot';
import ErrorInfo from './ErrorInfo';

@observer
export default class ShowSpeed extends React.Component {
    render() {
        return (
            <div>
                <SerialConnectionMenu store={this.props.serialConnectionStore}></SerialConnectionMenu>
                <IQplot store={this.props.serialConsoleStore}></IQplot>
                <ErrorInfo errorCount={this.props.serialConsoleStore.emptyCount}></ErrorInfo>
            </div>
        );

    }
}