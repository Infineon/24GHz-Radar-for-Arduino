import { Snackbar } from '@rmwc/snackbar';
import React from 'react';
import { observer } from "mobx-react"

@observer
export default class ErrorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.openSnack = this.openSnack.bind(this);
    }

    openSnack() {
        return this.props.errorCount == 4;
    }

    render() {
        return (
            <Snackbar
                show={this.openSnack()}
                message="Missing some data?"
                actionText="Get Help"
                actionHandler={() => alert('Please have a look at the troubleshooting section at the end of the page.')}
                timeout={1000000}
                dismissesOnAction={true}
            />
        );
    }
}

