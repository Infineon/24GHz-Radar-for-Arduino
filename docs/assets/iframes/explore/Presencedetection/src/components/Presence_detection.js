import React from 'react';
import { observer } from "mobx-react"
import SerialConnectionMenu from './SerialConnectionMenu';
import Board from './Board';

@observer
export default class ShowFFT extends React.Component {
    render() {
        return (
            
            <div>
                <SerialConnectionMenu store={this.props.serialConnectionStore} connection={this.props.serialConsoleStore}></SerialConnectionMenu>
                <Board store={this.props.serialConsoleStore}></Board>
            </div>
        );

    }
}