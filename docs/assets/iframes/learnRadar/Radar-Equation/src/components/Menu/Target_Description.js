import { Snackbar } from '@rmwc/snackbar';
import React from 'react';
import { observer } from "mobx-react"


@observer
export default class Target_Description extends React.Component {

    render() {
        return (
       
            <div className="detectionrange">
                <span><strong>Target:</strong> <strong className="objct_name">{this.props.object}</strong></span>
                <br></br>
                    <span> <strong>RCS (σ):</strong></span> <span className="RCS">{this.props.RCS}{"m²"}</span>               <br></br>

                <span><strong>Detection range :</strong></span>  <span className="Detection_range">{parseInt(this.props.range)} m</span>
            </div>

            

       
        );
    }
}
