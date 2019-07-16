import React from 'react';
import Plot from 'react-plotly.js';
import { observer } from "mobx-react"

@observer
export default class IQplot extends React.Component {
    render() {
        return (
            <div>
            
                <Plot
                    data={[
                        {
                            x: this.props.store.IQdata.real.keys(),
                            y: this.props.store.IQdata.real,
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: { color: 'red' },
                            name: "I"
                        },
                        {
                            x: this.props.store.IQdata.imag.keys(),
                            y: this.props.store.IQdata.imag,
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: { color: 'blue' },
                            name: "Q"
                        }
                    ]}
                    layout={{ width: 750, height: 480, title: 'IQ Data Plot', yaxis: {range: [0, 1024]}}}
                />
            </div>
        );
    }
}