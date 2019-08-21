import React from 'react';
import { observer } from "mobx-react"
import SerialConnectionMenu from './SerialConnectionMenu';

import Board from './Board';


@observer
export default class ShowSpeed extends React.Component {

    render() {
           
        return (
            <div>
                
                <SerialConnectionMenu store={this.props.serialConnectionStore}></SerialConnectionMenu>
                <Board  store={this.props.serialConnectionStore}></Board>
            </div>
        );

    }


   
}