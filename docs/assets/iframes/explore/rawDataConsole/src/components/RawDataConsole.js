import React from 'react';
import { observer } from "mobx-react"
import SerialConnectionMenu from './SerialConnectionMenu';
import SerialConsole from './SerialConsole';
import ErrorInfo from './ErrorInfo';

@observer
export default class RawDataConsole extends React.Component {
  render() {
    return (
      <div>
        <SerialConnectionMenu store={this.props.serialConnectionStore}></SerialConnectionMenu>
        <SerialConsole store={this.props.serialConsoleStore}></SerialConsole>
        <ErrorInfo errorCount={this.props.serialConsoleStore.emptyCount}></ErrorInfo>
      </div>
    );

  }
}