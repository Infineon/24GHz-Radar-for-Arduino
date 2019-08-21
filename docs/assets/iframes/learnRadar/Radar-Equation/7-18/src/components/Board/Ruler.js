import { Select } from "@rmwc/select";
import React from "react";
import { observer } from "mobx-react";

@observer
export default class Ruler extends React.Component {


  meters(){

    if (this.props.frequency==24){
      if(this.props.object=="Bus"){
        return [1,2,3,4];
      }
      else if (this.props.object=="Person"){
          return [1];
      }
      else if (this.props.object=="Car"){
          return [1,2,3,4];
      }
    }

    else if (this.props.frequency==60){

      if(this.props.object=="Bus"){
        return [1,2,3];
      }
      else if (this.props.object=="Car"){
        return [1,2,3];
      }
      else if (this.props.object=="Person"){
        return [1];
      }

    }
  }

  dimention(){

    if (this.props.frequency==24){
      if(this.props.object=="Bus"){
        return "Ruler_40";
      }
      
      else if (this.props.object=="Car"){
        return "Ruler_40";
      }

      else if (this.props.object=="Person"){
        return  "Ruler_10";
    }
  }

    else if (this.props.frequency==60) {

      if(this.props.object=="Bus"){
        return "Ruler_30";
      }
      else if (this.props.object=="Car"){
        return "Ruler_30";
      }
      else if (this.props.object=="Person"){
        return  "Ruler_10";

      }

    }
  }

 






  render() {
    const now = 60;
     
    const listItems = this.meters().map(() =>
     <div class="cm" > 
            <div class="mm"  />
            <div class="mm"  />
            <div class="mm"  />
            <div class="mm"  />
            <div class="mm"  />
            <div class="mm"  />
            <div class="mm"  />
            <div class="mm"  />
            <div class="mm"  />
    </div>);

    return (
       <div class={this.dimention()}  >
        {listItems}
        <div class="cm"  />
       </div>
    );
  }
}
