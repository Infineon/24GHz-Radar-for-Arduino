import { observable } from "mobx"

export default class SerialConnectionStore {
    @observable devices = [];
    @observable selectedPort = '';
    @observable portOpen = false;
    @observable baudRate = 38400;
    @observable agentFound = false;

    daemon = undefined;
    serialConsole = undefined
    self = this;

    constructor(daemon, serialConsole) {
        this.daemon = daemon;
        this.serialConsole = serialConsole;
        this.selectDevice = this.selectDevice.bind(this);
        this.togglePort = this.togglePort.bind(this);
        this.updateBaudRate = this.updateBaudRate.bind(this);
        this.updateAgentStatus = this.updateAgentStatus.bind(this);
    }

    updateDevices(devices) {
        this.devices = devices;
    }

    selectDevice(port) {
        if (this.devices.find(element => element.Name === port)) {
            this.serialConsole.addMessage('Selected Port: ' + port + '\r\n');
            this.selectedPort = port;
        } else {
            this.serialConsole.addMessage(this.selectedPort, 'Error selecting port: The selected port was not found in the device list');
        }
    }

    togglePort() {
        if (!this.portOpen) {
            this.serialConsole.addMessage('Opening Port: ' + this.selectedPort + " @ " + this.baudRate + '\r\n');
            this.daemon.openPort(this.selectedPort, this.baudRate);
        } else {
            this.serialConsole.addMessage('Closing Port: ' + this.selectedPort + '\r\n');
            this.daemon.closePort(this.selectedPort);
        }
        this.portOpen = !this.portOpen;
    }

    updateBaudRate(baudRate) {
        this.baudRate = baudRate;
    }

    updateAgentStatus(status) {
        if (status.toString() === 'true') {
            this.agentFound = true;
        } else {
            this.agentFound = false;
        }
    }
}