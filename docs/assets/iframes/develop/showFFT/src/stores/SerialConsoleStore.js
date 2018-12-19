import { observable, computed, reaction, action } from "mobx"
import FFTNayuki from '../actions/FFT'

export default class SerialConsoleStore {
    fftThreshold = 128;
    IQdataThreshold = 32;
    IQplotLength = 4;
    unprocessedThreshold = 100;

    daemon = undefined;
    processedIndex = 0;
    messages = '';
    lineSeparator = '\n';
    @observable magnitudes = [];
    @observable speed = 0;
    @observable max = [];
    @observable IQdata = {
        real: new Array(this.fftThreshold * this.IQplotLength).fill(0),
        imag: new Array(this.fftThreshold * this.IQplotLength).fill(0)
    };

    IQdataCache = {
        index: 0,
        processed: 0,
        real: new Array(this.fftThreshold),
        imag: new Array(this.fftThreshold)
    };
    
    fftStore = {
        index: 0,
        magnitudes: new Array(this.fftThreshold),
        max: 0,
        speed: 0
    };


    constructor(daemon) {
        this.daemon = daemon;
        this.fft = new FFTNayuki();

        this.addMessage = this.addMessage.bind(this);
        this.updateLineSeparator = this.updateLineSeparator.bind(this);
        this.processMessages = this.processMessages.bind(this);
        this.updateFftStore = this.updateFftStore.bind(this);
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

        unprocessedMessages.map(el => {
            let tmp = el.split(/[ ]/);

            if ((this.IQdataCache.index - this.IQdataCache.processed) >= this.IQdataThreshold) {
                this.updateIQdataStore();
            }

            if (this.IQdataCache.index >= this.fftThreshold) {
                this.updateFftStore();
                this.IQdataCache.index = 0;
                this.IQdataCache.processed = 0;
            }

            if (this.IQdataCache.index < this.fftThreshold) {
                this.IQdataCache.real[this.IQdataCache.index] = parseInt(tmp[0]);
                this.IQdataCache.imag[this.IQdataCache.index] = parseInt(tmp[1]);
                this.IQdataCache.index++;
            } else {
                console.log('shouldnt happen');
            }
        });
    }

    updateIQdataStore() {
        let newDataLength = this.IQdataCache.index - this.IQdataCache.processed;
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

    updateFftStore() {
        let data = {
            real: this.IQdataCache.real,
            imag: this.IQdataCache.imag
        };

        this.fft.preprocess(data);
        this.fft.transform(data.real, data.imag);
        this.fft.shift(data);
        let result = this.fft.computeMagnitudes(data);

        this.fftStore.magnitudes = result.magnitudes;
        this.fftStore.max = result.max;
        this.fftStore.speed = this.fft.calculateSpeed(result.max);
        this.fftStore.index++;

        if (this.fftStore.index >= 0) {
            this.publishFftResults();
            this.fftStore.index = 0;
        }

    }

    publishFftResults() {
        this.magnitudes = this.fftStore.magnitudes.slice(0);
        this.max = this.fftStore.max;
        //this.speed = this.fftStore.speed.reduce((a,b) => a + b, 0) / this.fftStore.speed.length;
        this.speed = this.fftStore.speed;
    }
}