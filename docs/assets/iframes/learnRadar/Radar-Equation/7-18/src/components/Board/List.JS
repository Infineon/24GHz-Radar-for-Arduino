import React from 'react';
import { observer } from "mobx-react"
import { Chip, ChipSet } from '@rmwc/chip';
import { Select } from '@rmwc/select';

@observer
export default class List extends React.Component {
  constructor(props) {
    super(props);
   
    console.log(this.props.RCS);        

}

  render() {
      return <div class="list">
                <span><strong>Antenne characteristics </strong></span>
                <br></br>   
                <span>Transmitted power :{this.props.ptx}</span>
                <br></br>
                <span>Frequence :{this.props.GTx} Ghz</span>
                <br></br>
                <span>GTx :{this.props.GTx}</span>
                <br></br>

                <span><strong>Target characteristics </strong></span>
                <span> Detection range:{this.props.RCS} {"m"}</span>
                <br></br>
                <span> Distance :{this.props.RCS} {"m"}</span>
                <br></br>
                <span> σ (RCS):{this.props.RCS} {"m²"}</span>
                <br></br>
             </div>
    }
}
