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
            else if (this.props.RCS=='30') {
              return "myRange_car";
            }
            else if (this.props.RCS=='5') {
              return "myRange_Bicycle";
            }
            else {
              return "myRange_Airplane";
            }
            
          }
        
        
    range(){
            if (this.props.RCS=='1' && this.props.frequency==24){
              return "30";
            }
            else if (this.props.RCS=='1' && this.props.frequency==60) {
              return "20";
            }
            else if (this.props.RCS=='5' && this.props.frequency==60) {
              return "30";
            }
            else if (this.props.RCS=='5' && this.props.frequency==24) {
              return "40";
            }
            else if (this.props.RCS=='30' && this.props.frequency==24) {
              return "60";
            }
            else if (this.props.RCS=='30' && this.props.frequency==60) {
              return "40";
            }
            else if (this.props.RCS=='150' && this.props.frequency==24) {
              return "90";
            }
            else if (this.props.RCS=='150' && this.props.frequency==60) {
              return "60";
            }
        
          }
    render() {
        
 
        const now = 60;
        return (
            <div className="ob">
            <div className="draggable">
               <input type="range" className={this.objet()} min="1" max={this.range()} onChange={ (event) => this.props.changedistance(event.target.value) }  value={this.props.distance} ref="inp"/>
            </div>
            <Ruler  frequency ={this.props.frequency}  object={this.props.object} />
            <br></br>
              <span className='text_distance'><strong>Distance: {this.props.distance} metres</strong></span> 
          </div>
           
        );
    }
}

