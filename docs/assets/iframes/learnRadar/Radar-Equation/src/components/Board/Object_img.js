
import { Select } from '@rmwc/select';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class Object_img extends React.Component {
    constructor(props) {
        super(props);     
    }

    render() {
        return (            
              <img className="img_object"  src={this.props.object_img } alt='Select Object'   /> 
        );
    }
}       


