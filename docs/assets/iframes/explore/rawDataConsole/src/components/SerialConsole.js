import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { Grid, GridCell } from '@rmwc/grid';
import React from 'react';
import { observer } from "mobx-react"
import LineSeparator from './SerialConsole/LineSeparator';

@observer
export default class SerialConsole extends React.Component {
  render() {
    const store = this.props.store;
    const lineSeparators = [
      { label: 'Newline', value: '\n' },
      { label: 'Carriage Return', value: '\r' },
      { label: 'NL and CR', value: '\r\n' },
      { label: 'No separator', value: '' }
    ]

    return <div>
      <TextField textarea readOnly fullwidth label="Console" value={store.text} rows="8" />

      <Grid>
        <GridCell span="2">
          <Button onClick={store.clearMessages}>Clear Console</Button>
        </GridCell>
         {/* <GridCell span="2">
          <LineSeparator lineSeparators={lineSeparators} updateLineSeparator={store.updateLineSeparator}></LineSeparator>
        </GridCell> */}
      </Grid>
    </div>;
  }
}