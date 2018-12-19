import React from 'react';
import { observer } from "mobx-react"
import SerialConnectionMenu from './SerialConnectionMenu';
import FFTSpectrum from './FFTSpectrum';

@observer
export default class ShowFFT extends React.Component {
    render() {
        return (
            <div>
                <SerialConnectionMenu store={this.props.serialConnectionStore}></SerialConnectionMenu>
                <FFTSpectrum store={this.props.serialConsoleStore}></FFTSpectrum>
            </div>
        );

    }
}