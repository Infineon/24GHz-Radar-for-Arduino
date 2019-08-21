import React from 'react';
import { observer } from "mobx-react"
import Menu from './Menu';
import Board from './Board';


@observer
export default class RadarEquation extends React.Component {

    render() {
           
        return (
            <div>
                
                <Menu store={this.props.serialConnectionStore}></Menu>
                <Board  store={this.props.serialConnectionStore}></Board>
            </div>
        );

    }


   
}