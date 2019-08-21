import { Select } from '@rmwc/select';
import React from 'react';
import { observer } from "mobx-react"
import Ruler from "./Ruler";




@observer
export default class Distance extends React.Component {
    constructor(props) {
        super(props);
        this.objet=this.objet.bind(this);
        this.range=this.range.bind(this);
        }

    objet(){
            if (this.props.RCS=='1'){
              return "myRange_person";
            }
            else if (this.props.RCS=='100') {
              return "myRange_car";
            }
            else {
              return "myRange_bus";
            }
          }
        
        
    range(){
            if (this.props.RCS=='1' ){
              return "10";
            }
            else if (this.props.RCS=='100' && this.props.frequency==24) {
              return "40";
            }
            else if (this.props.RCS=='100' && this.props.frequency==60) {
              return "30";
            }
            else if (this.props.RCS=='200' && this.props.frequency==24) {
              return "40";
            }
            else if (this.props.RCS=='200' && this.props.frequency==60) {
              return "30";
            }
        
          }
    render() {
        
 
        const now = 60;
        return (
            <div class="ob">
            <div class="draggable">
               <input type="range" class={this.objet()} min="0" max={this.range()} onChange={ (event) => this.props.changedistance(event.target.value) }  value={this.props.distance} ref="inp"/>
            </div>
            <Ruler  frequency ={this.props.frequency}  object={this.props.object} />
            <br></br>
              <span class='text_distance'><strong>Distance: {this.props.distance} metres</strong></span> 
          </div>
           
        );
    }
}

