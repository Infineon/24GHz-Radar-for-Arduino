import React from 'react';
import Plot from 'react-plotly.js';
import { observer } from "mobx-react"

@observer
export default class FFTSpectrum extends React.Component {
    render() {
        return (
            <div>
                <Plot
                    data={[
                        {
                            x: this.props.store.magnitudes.keys(),
                            y: this.props.store.magnitudes,
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: { color: 'red' },
                        }
                    ]}
                    layout={{ width: 750, height: 480, title: 'FFT Spectrum'/*, yaxis: {range: [0, 20]} */}}
                />
            </div>
        );
    }
}