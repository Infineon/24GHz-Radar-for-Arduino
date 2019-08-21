import { Select } from "@rmwc/select";
import React from "react";
import { observer } from "mobx-react";
import Equation from "./Board/Equation";
import Antenne from "./Board/Antenne";
import Plot_Power_Delay from "./Board/Plot_Power_Delay";
import "react-rangeslider/lib/index";
import Transmitted_power from "./Board/Transmitted_power";
import Distance from "./Board/Distance";


@observer
export default class Board extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  

  render() {
    
  
    //Elements of Radar equation\
    const RCS = this.props.store.RCS;
    const frequency = this.props.store.frequency;
    const GTx = this.props.store.gain;
    const T = (2 * this.props.store.distance) / (3 * Math.pow(10, 8));
    const T_plot = (T * 1000000).toFixed(2);

    //Time delay 
    const time_delay ="T " + T_plot + "μs=(2*D(" + this.props.store.distance + "m))/(C(3*10^8m/s))";
    //Received power 
    const rslt = ((this.props.store.power *1000000*RCS *Math.pow(GTx, 2) *Math.pow(3 / (frequency * 10), 2)) / (Math.pow(4 * Math.PI, 3) * Math.pow(this.props.store.distance, 4) )).toFixed(3);
    const rslt_db="Pr "+(30+10*Math.log10(rslt)).toFixed(3)+"dbmw=10*Log10("+rslt+")+30";
    const db=(10*Math.log10(rslt)+30).toFixed(3);
    // Radar Equation
    const radar ="Pr  " +rslt +"µW=(P("+this.props.store.power + ")w*σ(" + RCS + "m²)*G(" +GTx + ")^2*C(3*10^8 m/s)^2)/((4*π)^3*D("+this.props.store.distance+"m)^4*F(" +frequency +"GHz)^2)";
    return (
      <div className="Contenu">
        <div className="row">
            
            <Equation  /* Radar equation +Time delay */ radar={radar} rslt={this.rslt}    rslt_db={rslt_db} time_delay={time_delay}/>
            <Plot_Power_Delay  time_delay={time_delay} prx={db} T_plot={T_plot} frequency={frequency} RCS={RCS}/>  
        </div>


        <div className="row">
          <Antenne transmitted_power={this.onSelectLanguage} /> 
          <Distance distance={this.props.store.distance} changedistance={this.props.store.changedistance}  frequency ={this.props.store.frequency}  object={this.props.store.object} RCS={this.props.store.RCS}></Distance>
        </div>

        <Transmitted_power power={this.props.store.power} changepower={this.props.store.changepower} ></Transmitted_power>
      </div>
    );
  }
}

