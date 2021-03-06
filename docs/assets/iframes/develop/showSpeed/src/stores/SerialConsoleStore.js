import { observable, computed, reaction, action } from "mobx"

export default class SerialConsoleStore {
    daemon = undefined;
    lineSeparator = '\n';
    @observable messages = '';

    constructor(daemon) {
        this.daemon = daemon;


        this.addMessage = this.addMessage.bind(this);
        this.updateLineSeparator = this.updateLineSeparator.bind(this);
    }

    addMessage(message) {
        if (this.messages.length > 3000) {
            this.messages = this.messages.substr(message.length);
            this.processedIndex -= message.length;
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

    @computed get speed() {
        let result = this.messages.split(/[\r|\r\n|\n]+/).filter(el => el.match(/^\d+[.,]\d+$/)).splice(-2, 1)[0]
        if (result) {
            return result;
        } else {
            return 0.00;
        }
    }
}