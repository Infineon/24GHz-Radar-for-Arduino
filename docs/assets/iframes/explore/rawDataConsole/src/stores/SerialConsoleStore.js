import { observable, computed } from "mobx"

export default class SerialConsoleStore {
    @observable messages = '';
    @observable lineSeparator = '\n';
    daemon = undefined;

    constructor(daemon) {
        this.daemon = daemon;

        this.addMessage = this.addMessage.bind(this);
        this.updateLineSeparator = this.updateLineSeparator.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
    }

    addMessage(message) {
        if (this.messages.length > 6000) {
            this.messages = this.messages.substr(message.length);
        } 
        this.messages += message;
    }

    clearMessages() {
        this.messages = '';
    }

    updateLineSeparator(lineSeparator) {
        this.lineSeparator = lineSeparator;
        console.log('new separator');
    }

    @computed get text() {
        return this.messages;
    }
}