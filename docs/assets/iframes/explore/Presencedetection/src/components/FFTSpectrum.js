import React from "react";
import Plot from "react-plotly.js";
import { observer } from "mobx-react";
import { Grid, GridCell } from "@rmwc/grid";
import Config from "./board/Config";


@observer
export default class FFTSpectrum extends React.Component {
  
  constructor (props, context) {
    super(props, context)
    
  }

  /*  detection(){

    if(this.props.store.presence=="false"){
      return  "#FF0000";
    }
    else if (this.props.store.v_buf_MD_mean>this.state.threshold){

      return "#7FFF00";
    }
    else if(this.props.store.v_buf_MD_mean>this.state.sensibility && this.props.store.presence=="true"){
      return "#7FFF00";
    }
    else if(this.props.store.v_buf_MD_mean<this.state.sensibility && this.props.store.presence=="true" && this.props.store.Timer >0 ){
       return "#7FFF00";
    }
    else if(this.props.store.v_buf_MD_mean<2.8+this.state.sensibility &&  this.props.store.presence=="true" &&  this.props.store.Timer ==0 ){
      return  "#FF0000";
    }
  }*/

  color(){
   
    if (this.props.store.v_buf_MD_mean>(this.props.store.sensibility)){
        
      return "#FFFF00	";
    }
    else return "#bbb";
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

    /*<input type='range' min={0} max={2} step={0.1}    orient="vertical"   onChange={this.changethreshold} threshold={this.state.threshold} ref="inp"  />
        <span><strong>Transmitted Power: </strong>{this.state.threshold}<strong> Watt </strong></span>*/  

    const presence = {
      container: {
          background: this.detect()
      }
    };
  
   
    return (
      <div className="container">
        
        <h3 className="presencedetection">Presence Detection</h3>
        <div>
          <span class="presence" style={presence.container}></span>
          <span class= "dot" style={styles.container}></span>
          <h3 className="presencedetection">{this.props.store.v_buf_MD_mean} </h3>
        </div>
          
          <h3 className="detection"> Presence</h3>
          <h3 className="micro">Micro Motion</h3>
        <div>
          <Config temps=/*Timer */{this.props.store.temps} updateTimer={this.props.store.updateTimer}   /*threshold*/ threshold={this.props.store.threshold} changethreshold={this.props.store.changethreshold} /*Sensibility */   sensibility={this.props.store.sensibility} changesensibility={this.props.store.changesensibility}></Config>
          
          <span className="sensibility"><strong>Micro motion: </strong>{(this.props.store.sensibility- 2.9).toFixed(2)}</span>
          <span className="threshold"><strong>Macro Motion: </strong>{this.props.store.threshold}</span> 

        
        </div>
      
      </div>

    );
  }
}
