"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import RawDataConsole from './components/RawDataConsole';
import SerialConnectionStore from './stores/SerialConnectionStore';
import SerialConsoleStore from './stores/SerialConsoleStore';
import DaemonActions from './actions/DaemonActions';

const daemonActions = new DaemonActions();
const serialConsoleStore = new SerialConsoleStore(daemonActions);
const serialConnectionStore = new SerialConnectionStore(daemonActions, serialConsoleStore);
daemonActions.registerSerialConsole(serialConsoleStore);
daemonActions.registerSerialConnection(serialConnectionStore);

const domContainer = document.querySelector('#root');
ReactDOM.render(<RawDataConsole serialConnectionStore={ serialConnectionStore } serialConsoleStore={ serialConsoleStore }/>, domContainer);