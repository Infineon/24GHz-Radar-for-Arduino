import React from 'react';
import { observer } from "mobx-react"
import { Grid, GridCell } from '@rmwc/grid';
import Object from './SerialConnectionMenu/Object';
import Frequency from './SerialConnectionMenu/Frequency';
import Antenne_Description from './SerialConnectionMenu/Antenne_Description';
import Target_Description from './SerialConnectionMenu/Target_Description';
import Gain from './SerialConnectionMenu/Gain';




@observer
export default class SerialConnectionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.objects=["PERSON","AIRPLANE" , "CAR","BICYCLE"];
    this.Frequences=["24","60"];
    this.Gain=["10","100","300"];

    this.Frequences = this.Frequences.map(element => { return { label: '' + element + ' GHz', value: element } });
   

    
  }

  render() {

    
    const ptx=this.props.store.power*1000000;
    const G=this.props.store.Gtx;
    const lamda=  3/(this.props.store.frequency*10);
    const threshold=0.1;
    const store = this.props.store;
    const RCS=this.props.store.RCS;
    const r=(ptx*G*G*lamda*lamda*RCS)/(threshold* Math.pow(Math.PI*4,3));
    const range=  Math.pow( r,1/4).toFixed(2);
    return <Grid>
      
      <GridCell span="2">
        <Object objects={this.objects} changeObject={store.changeObject} currentObject={store.object}></Object>
      </GridCell>

      <GridCell span="4">
        <Frequency Frequences={this.Frequences} changeFrequence={store.changeFrequence} currentFrequence={store.frequency}></Frequency>
      </GridCell>

        

      <GridCell>
      <Target_Description  RCS={store.RCS} range={range} object={store.object} ></Target_Description>
      </GridCell>     
  

    </Grid>;
  }
}