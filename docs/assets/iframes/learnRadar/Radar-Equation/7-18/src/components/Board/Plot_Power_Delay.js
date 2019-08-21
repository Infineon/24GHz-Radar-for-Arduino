import React from "react";
import Plot from "react-plotly.js";
import { observer } from "mobx-react";
import MathJax from "react-mathjax2";
@observer
export default class Plot_Power_Delay extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  
  color(){
    if (this.props.prx>=0.1){
      this.detect="Detected";
      return "#00FF00";
    }
    else{
      this.detect="Not detected";
      return "#FF0000";
     
    }
  }
  

  text(){
    if (this.props.prx>=0.1){
      return "Detected";
    }
    else{
      return "Not detected";
    }
  }
  render() {
    const T_plot = this.props.T_plot;
    const  detect="Not detected";

    const styles = {
      container: {
          background: this.color()
      }
    };
    return (
      <div>
        <div class="message" style={styles.container}><span><strong>{this.text()}</strong></span></div>
        <div class="plote">

          <Plot
          
            data={[
            {
              x: [-1 , 1],
              y: [0.1,  0.1],

              type: "line",
              marker: { color: "red" },
              name: "Threshold"
             

              
            },
            {
              x: [ T_plot],
              y: [this.props.prx],
              width : [ 0.01],
              type: "bar",
              marker: { color: "blue" },
              name: "Prx"
            },
            ]}
            config={{displayModeBar : false}}

            layout={{   width: 340, height: 290, 

            yaxis: { range: [ 0.0001, 0.1], title:"Power (µW)" ,fixedrange: true, type: 'log'
          },xaxis: { range: [0, 0.35], title:"Delay (μs)",fixedrange: true }}
          }
          />
        </div>

      </div>
    );
  }
}
