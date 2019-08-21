import { Snackbar } from '@rmwc/snackbar';
import React from 'react';
import { observer } from "mobx-react"


@observer
export default class Antenne_Description extends React.Component {

    render() {
        return (
       
            <div class="detectionrange">
                <span><strong>Antenne: </strong></span>
                <br></br>
                <span>Transmitted power:{this.props.power} w</span>               
                <br></br>
                <span>Frequence: {this.props.frequency} Ghz</span>                
            </div>

            

       
        );
    }
}

