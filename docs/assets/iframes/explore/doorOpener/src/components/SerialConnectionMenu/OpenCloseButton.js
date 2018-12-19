import React from 'react';
import { observer } from "mobx-react"
import { Button } from '@rmwc/button';

@observer
export default class OpenCloseButton extends React.Component {
  render() {
      return <Button raised disabled={ !this.props.selectedPort } onClick={ this.props.onClickHandler }>{ this.props.portOpen ? 'Stop' : 'Start'}</Button>;
  }
}