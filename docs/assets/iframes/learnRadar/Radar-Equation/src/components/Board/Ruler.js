import { Select } from "@rmwc/select";
import React from "react";
import { observer } from "mobx-react";

@observer
export default class Ruler extends React.Component {


  meters(){

    if (this.props.frequency==24){
      if(this.props.object=="AIRPLANE"){
        return [1,2,3,4,5,6,7,8,9];

      }
      else if (this.props.object=="PERSON"){
          return [1,2,3];
      }
      else if (this.props.object=="BICYCLE"){
        return [1,2,3,4];
    }
      else if (this.props.object=="CAR"){
          return [1,2,3,4,5,6];
      }
    }

    else if (this.props.frequency==60){

      if(this.props.object=="AIRPLANE"){
        return [1,2,3,4,5,6];
      }
      else if (this.props.object=="CAR"){
        return [1,2,3,4];
      }
      else if (this.props.object=="PERSON"){
        return [1,2];
      }
      else if (this.props.object=="BICYCLE"){
        return [1,2,3];
      }

    }
  }

  dimention(){

    if (this.props.frequency==24){
      if(this.props.object=="AIRPLANE"){
        return "Ruler_90";
      }
      
      else if (this.props.object=="CAR"){
        return "Ruler_60";
      }

      else if (this.props.object=="PERSON"){
        return  "Ruler_30";
    }
      else if (this.props.object=="BICYCLE"){
        return  "Ruler_40";
    }
  }

    else if (this.props.frequency==60) {

      if(this.props.object=="AIRPLANE"){
        return "Ruler_60";
      }
      else if (this.props.object=="BICYCLE"){
        return "Ruler_30";
      }
      else if (this.props.object=="CAR"){
        return "Ruler_40";
      }
      else if (this.props.object=="PERSON"){
        return  "Ruler_20";

      }

    }
  }


  render() {
     
    const listItems = this.meters().map(() =>
     <div className="cm" > 
            <div className="mm"  />
            <div className="mm"  />
            <div className="mm"  />
            <div className="mm"  />
            <div className="mm"  />
            <div className="mm"  />
            <div className="mm"  />
            <div className="mm"  />
            <div className="mm"  />
    </div>);

    return (
       <div className={this.dimention()}  >
        {listItems}
        <div className="cm"  />
       </div>
    );
  }
}
