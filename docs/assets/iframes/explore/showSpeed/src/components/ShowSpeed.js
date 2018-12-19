import React from 'react';
import { observer } from "mobx-react"
import SerialConnectionMenu from './SerialConnectionMenu';
import Tachometer from './Tachometer';
import ErrorInfo from './ErrorInfo';

@observer
export default class ShowSpeed extends React.Component {
    render() {
        return (
            <div>
                <SerialConnectionMenu store={this.props.serialConnectionStore}></SerialConnectionMenu>
                <Tachometer store={this.props.fftStore} scs={this.props.serialConsoleStore} ></Tachometer>
                <ErrorInfo errorCount={this.props.serialConsoleStore.emptyCount}></ErrorInfo>
            </div>
        );

    }
}