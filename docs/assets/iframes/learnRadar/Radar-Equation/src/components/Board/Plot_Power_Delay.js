import React from "react";
import Plot from "react-plotly.js";
import { observer } from "mobx-react";
import MathJax from "react-mathjax2";
@observer
export default class Plot_Power_Delay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.delay_max=this.delay_max.bind(this);
  }

  delay_max(){
  

      if( (this.props.RCS=='1' && this.props.frequency==24) || (this.props.RCS=='5' && this.props.frequency==60)){
        return (60/300);
      }
      else if (this.props.RCS=='1' && this.props.frequency==60) {
        return (40/300);
      }
    
      else if( (this.props.RCS=='30' && this.props.frequency==60) || (this.props.RCS=='5' && this.props.frequency==24))    {
        return (80/300);
      }
      else if ((this.props.RCS=='30' && this.props.frequency==24) ||(this.props.RCS=='150' && this.props.frequency==60)) {
        return (120/300);
      }
     
      else if (this.props.RCS=='150' && this.props.frequency==24) {
        return (180/300);
      }
      
    }


  color(){
    if (this.props.prx>=20){
      this.detect="Detected";
      return "#00FF00";
    }
    else{
      this.detect="Not detected";
      return "#FF0000";
     
    }
  }
  

  text(){
    if (this.props.prx>=20){
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
        <div className="message" style={styles.container}><span><strong>{this.text()}</strong></span></div>
        <div className="plote">

          <Plot
          
            data={[
            {
              x: [-0.01 , this.delay_max() +0.2],
              y: [20,  20],

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

            yaxis: { range: [-10,70], title:"Power (dBmw)" ,fixedrange: true, 
          },xaxis: { range: [0,this.delay_max()], title:"Delay (μs)",fixedrange: true }}
          }
          />
        </div>

      </div>
    );
  }
}
