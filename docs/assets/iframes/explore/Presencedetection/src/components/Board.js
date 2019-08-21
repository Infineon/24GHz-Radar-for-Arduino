import React from "react";
import Plot from "react-plotly.js";
import { observer } from "mobx-react";
import { Grid, GridCell } from "@rmwc/grid";
import Config from "./board/Config";
import Timer from "./board/Timer";

@observer
export default class FFTSpectrum extends React.Component {
  
  constructor (props, context) {
    super(props, context)
    this.Motion=this.Motion.bind(this);
    this.presence=this.presence.bind(this);

  }


  color(){
   
    if (this.props.store.v_buf_MD_mean>(this.props.store.sensibility)){
        
      return "#96BEB6";
    }
    else return "#E9E6E7";
  }
    
  Motion(){

    if (this.props.store.v_buf_MD_mean>(this.props.store.sensibility)){
        
      return "Motion Detected";
    }
    else return "No Motion Detected";
  }

  presence(){
    if (this.detect() =="#00FF00"){
        
      return "Presence Detected";
    }
    else return "No Presence Detected";
  }

  

  detect(){
    return this.props.store.color;
  }


  render() {
    const store = this.props.store;
    const styles = {
      container: {
          background: this.color()
      }
    };


    const presence = {
      container: {
          background: this.detect()
      }
    };
  
   
    return (
      <div class="container">
        
        <div>
			
          <h3 class="presencedetection">Presence detection</h3>
          <span class="presence" style={presence.container}></span>
          <span class= "dot" style={styles.container}></span>
          <span class='number'>{this.props.store.number}</span>  
        </div>
        <div> 
          <h3 class="detection"> {this.presence()}</h3>
          <h3 class="micro">{this.Motion()}</h3>
		 
        </div>
        <Timer temps={this.props.store.temps} updateTimer={this.props.store.updateTimer} ></Timer>
        <div>
          <Config  /*threshold*/ threshold={this.props.store.threshold} changethreshold={this.props.store.changethreshold} /*Sensibility */   sensibility={this.props.store.sensibility} changesensibility={this.props.store.changesensibility}></Config>
          
          <span class="sensibility"><strong>Micro motion: </strong>{(this.props.store.sensibility- 3.7).toFixed(2)}</span>
          <span class="threshold"><strong>Macro motion: </strong>+{this.props.store.threshold-10}</span> 

        
        </div>
      
      </div>

    );
  }
}
