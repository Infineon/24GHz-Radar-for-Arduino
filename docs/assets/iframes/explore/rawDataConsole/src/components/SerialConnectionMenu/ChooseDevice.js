import React from 'react';
import { observer } from "mobx-react"
import { Chip, ChipSet } from '@rmwc/chip';
import { Select } from '@rmwc/select';

@observer
export default class ChooseDevice extends React.Component {
  render() {
    let devices = this.props.devices;

    if (devices.length < 6) {
      let chips = devices.map((device, i) => <Chip selected={this.props.selected === device.Name}
        onClick={() => this.props.onSelectDeviceHandler(device.Name)} key={i}>{device.Name}</Chip>);

      return <div>
        <ChipSet choice>
          {chips}
        </ChipSet>
      </div>;
    } else {
      devices = devices.map(device => { return device.Name });

      return <Select onChange={(event) => this.props.onSelectDeviceHandler(event.target.value)} label="Device" options={devices} />
    }
  }
}