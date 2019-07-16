import React from 'react';
import { observer } from "mobx-react"
import SerialConnectionMenu from './SerialConnectionMenu';
import SlidingDoor from './SlidingDoor';
import ErrorInfo from './ErrorInfo';

@observer
export default class ShowSpeed extends React.Component {
    render() {
        return (
            <div>
                <SerialConnectionMenu store={this.props.serialConnectionStore}></SerialConnectionMenu>
                <SlidingDoor store={this.props.fftStore} scs={this.props.serialConsoleStore} ></SlidingDoor>
                <ErrorInfo errorCount={this.props.serialConsoleStore.emptyCount}></ErrorInfo>
            </div>
        );

    }
}