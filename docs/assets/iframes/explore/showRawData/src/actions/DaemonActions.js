import Daemon from 'arduino-create-agent-js-client';

export default class DeamonActions {
  daemon = undefined;
  serialConsole = undefined;
  serialConnection = undefined;

  constructor(serialConsole = undefined, serialConnection = undefined) {
    this.daemon = new Daemon();
    this.registerSerialConsole(serialConsole);
    this.registerSerialConnection(serialConnection);
  }

  registerSerialConsole(serialConsole) {
    this.serialConsole = serialConsole;
    this.subscribeChannelOpenStatus();
    this.subscribeError();
    this.subscribeSerialMonitorMessages();
    // Add downloading and uploading
  }

  registerSerialConnection(serialConnection) {
    this.serialConnection = serialConnection;
    this.subscribeDevices();
    this.subscribeAgentFound();
  }

  openPort(port, baudRate) {
    this.daemon.openSerialMonitor(port, baudRate);
  }

  writeMessage(port, message) {
    this.daemon.writeSerial(port, message);
  }

  closePort(port) {
    this.daemon.closeSerialMonitor(port);
  }

  subscribeChannelOpenStatus() {
    if (this.serialConsole) {
      this.daemon.channelOpenStatus.subscribe(status => {
        if (status !== null) {
          this.serialConsole.addMessage('ChannelOpenStatus: ' + status + '\r\n');
        }
        return true;
      });
    }
    else {
      return false;
    }
  }

  subscribeAgentFound() {
    if (this.serialConnection) {
      this.daemon.agentFound.subscribe(status => {
        this.serialConnection.updateAgentStatus(status);
        return true;
      });
    }
    else {
      return false;
    }
  }

  subscribeError() {
    if (this.serialConsole) {
      this.daemon.error.subscribe(err => {
        if (err) {
          this.serialConsole.addMessage('Error: ' + err);
        }
        return true;
      });
    }
    else {
      return false;
    }
  }

  subscribeDevices() {
    if (this.serialConnection) {
      this.daemon.devicesList.subscribe(({ serial, network }) => {
        const devices = serial.concat(network);
        this.serialConnection.updateDevices(devices);
        return true;
      });
    }
    else {
      return false;
    }
  }

  subscribeSerialMonitorMessages() {
    if (this.serialConsole) {
      this.daemon.serialMonitorMessages.subscribe(message => {
        this.serialConsole.addMessage(message);
        return true;
      });
    }
    else {
      return false;
    }
  }

  subscribeUploading() {
    // TODO: implement meaningfully
    this.daemon.uploading.subscribe(upload => {
      console.log(status);
    });
  }

  subscribeDownloading() {
    // TODO: implement meaningfully
    this.daemon.downloading.subscribe(download => {
      console.log(download);
    });
  }
}