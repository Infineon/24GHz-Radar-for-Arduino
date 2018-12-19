import React from 'react';
import { observer } from "mobx-react"
import { Button } from '@rmwc/button';

@observer
export default class Flash extends React.Component {
  render() {
      return <Button raised onClick={ this.props.onClickHandler }>Flash</Button>;
  }
}