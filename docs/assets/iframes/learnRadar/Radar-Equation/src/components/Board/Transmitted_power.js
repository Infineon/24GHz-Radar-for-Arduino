import React from 'react';
import { observer } from "mobx-react"
import { Chip, ChipSet } from '@rmwc/chip';
import { Select } from '@rmwc/select';

@observer
export default class Ptx extends React.Component {
  constructor(props) {
    super(props);
   
    }

  render() {
      return (
      <div className='ptx'>
        <input className="ptx" type='range' min={0} max={5} step={0.1}  onChange={ (event) => this.props.changepower(event.target.value) }  value={this.props.power} ref="inp"  />
        <div className='Transmitted_power'>
          <span><strong>Transmitted power P={this.props.power} w</strong></span>
        </div>
      </div>)
      ;
    }
}
