import { observable, computed, reaction, action } from "mobx"

export default class SerialConsoleStore {
    IQdataThreshold = 32;
    IQplotLength = 16;
    unprocessedThreshold = 100;

    daemon = undefined;
    processedIndex = 0;
    @observable emptyCount = 0;
    messages = '';
    lineSeparator = '\n';
    @observable IQdata = {
        real: new Array(this.IQdataThreshold * this.IQplotLength).fill(0),
        imag: new Array(this.IQdataThreshold * this.IQplotLength).fill(0)
    };

    IQdataCache = {
        index: 0,
        processed: 0,
        real: new Array(this.IQdataThreshold),
        imag: new Array(this.IQdataThreshold)
    };

    constructor(daemon) {
        this.daemon = daemon;
        this.addMessage = this.addMessage.bind(this);
        this.updateLineSeparator = this.updateLineSeparator.bind(this);
        this.processMessages = this.processMessages.bind(this);
    }

    addMessage(message) {
        if (this.messages.length > 3000) {
            this.messages = this.messages.substr(message.length);
            this.processedIndex -= message.length;
        }
        this.messages += message;

        if ((this.messages.length - this.processedIndex) > this.unprocessedThreshold) {
            this.processMessages();
        }
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

    processMessages() {
        let unprocessedMessages = this.messages.substr(this.processedIndex).split(/[\r|\r\n|\n]+/);
        let remainder = unprocessedMessages.splice(-1, 1);
        this.processedIndex = this.messages.length - remainder[0].length;
        unprocessedMessages = unprocessedMessages.filter(el => el.match(/^\d+[ ]+\d+$/));

        if (this.emptyCount && unprocessedMessages.length > 0) {
            this.emptyCount = 0;
        } else {
            this.emptyCount = (this.emptyCount + 1) % 1024;
        }

        unprocessedMessages.map(el => {
            let tmp = el.split(/[ ]/);

            if (this.IQdataCache.index >= this.IQdataThreshold) {
                this.updateIQdataStore();
                this.IQdataCache.index = 0;
            }

            if (this.IQdataCache.index < this.IQdataThreshold) {
                this.IQdataCache.real[this.IQdataCache.index] = parseInt(tmp[0]);
                this.IQdataCache.imag[this.IQdataCache.index] = parseInt(tmp[1]);
                this.IQdataCache.index++;
            } else {
                console.log('shouldnt happen');
            }
        });
    }

    updateIQdataStore() {
        let newDataLength = this.IQdataCache.index;
        let data = {
            real: this.IQdata.real.slice(0),
            imag: this.IQdata.imag.slice(0)
        };
        for (let i = 0; i < data.real.length; i++) {
            if (i < data.real.length - newDataLength) {
                data.real[i] = data.real[i + newDataLength];
                data.imag[i] = data.imag[i + newDataLength];
            } else {
                data.real[i] = this.IQdataCache.real[i - data.real.length + newDataLength];
                data.imag[i] = this.IQdataCache.imag[i - data.imag.length + newDataLength];
            }
        }
        this.IQdataCache.processed = this.IQdataCache.index;
        this.IQdata = data;
    }
}