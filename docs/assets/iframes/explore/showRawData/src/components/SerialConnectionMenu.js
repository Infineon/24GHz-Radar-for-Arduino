import React from 'react';
import { observer } from "mobx-react"
import { Grid, GridCell } from '@rmwc/grid';
import OpenCloseButton from './SerialConnectionMenu/OpenCloseButton';
import ChooseDevice from './SerialConnectionMenu/ChooseDevice';
import BaudRate from './SerialConnectionMenu/BaudRate';
import AgentFound from './SerialConnectionMenu/AgentFound';

@observer
export default class SerialConnectionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onTogglePort = this.onTogglePort.bind(this);

    this.baudRates = [300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200];
    this.baudRates = this.baudRates.map(element => { return { label: '' + element + ' baud', value: element } });
  }

  onTogglePort() {
    this.props.store.togglePort();
  }
  
  render() {
    const store = this.props.store;
    return <Grid>
      <GridCell span="1" align="middle">
        <OpenCloseButton selectedPort={store.selectedPort} onClickHandler={this.onTogglePort} portOpen={store.portOpen}></OpenCloseButton>
      </GridCell>
      <GridCell span="2">
        <BaudRate baudRates={this.baudRates} updateBaudRate={store.updateBaudRate} currentBaudRate={store.baudRate}></BaudRate>
      </GridCell>
      <GridCell span="3">
        <ChooseDevice devices={store.devices} selected={store.selectedPort} onSelectDeviceHandler={store.selectDevice}></ChooseDevice>
      </GridCell>
      <GridCell span="2">
        <AgentFound status={store.agentFound}></AgentFound>
      </GridCell>
    </Grid>;
  }
}