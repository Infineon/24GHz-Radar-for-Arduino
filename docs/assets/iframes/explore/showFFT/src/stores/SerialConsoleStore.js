import { observable, computed, reaction, action } from "mobx"
import FFTNayuki from '../actions/FFT'

export default class SerialConsoleStore {
    fftThreshold = 128;
    IQdataThreshold = 128;
    unprocessedThreshold = 150;
    fftLength = 128;
    IQplotLength = 1;
    speedAverage = 4;

    daemon = undefined;
    processedIndex = 0;
    messages = '';
    lineSeparator = '\n';
    @observable emptyCount = 0;
    @observable magnitudes = [];
    @observable speed = 0;
    @observable max = [];
    @observable IQdata = {
        real: new Array(this.fftLength).fill(0),
        imag: new Array(this.fftLength).fill(0)
    };

    IQdataCache = {
        index: 0,
        processedIQ: 0,
        processedFFT: 0,
        real: new Array(this.fftLength * this.IQplotLength).fill(0),
        imag: new Array(this.fftLength * this.IQplotLength).fill(0)
    };
    
    fftStore = {
        index: 0,
        magnitudes: new Array(this.fftLength),
        max: 0,
        speed: new Array(this.speedAverage)
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
            //console.log('messages length: ' + this.messages.length);
            //console.log('processing messages');
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
        //console.log('IQdataCache length: ' + this.IQdataCache.index);
        //console.log('unprocessed messages: ' + unprocessedMessages.length);

        if (this.emptyCount && unprocessedMessages.length > 0) {
            this.emptyCount = 0;
        } else {
            this.emptyCount = (this.emptyCount + 1) % 1024;
        }

        unprocessedMessages.map(el => {
            let tmp = el.split(/[ ]/);

            if ((this.IQdataCache.index - this.IQdataCache.processedIQ) >= this.IQdataThreshold) {
                //console.log('IQ refresh');
                this.updateIQdataStore();
            }

            if ((this.IQdataCache.index - this.IQdataCache.processedFFT) >= this.fftThreshold) {
                //console.log('FFT and reset');
                this.updateFftStore();
            }

            if (this.IQdataCache.index >= this.fftLength * this.IQplotLength) {
                this.IQdataCache.index = 0;
                this.IQdataCache.processedIQ = 0;
                this.IQdataCache.processedFFT = 0;
            }

            if (this.IQdataCache.index < this.fftLength * this.IQplotLength) {
                //console.log('adding el');
                this.IQdataCache.real[this.IQdataCache.index] = parseInt(tmp[0]);
                this.IQdataCache.imag[this.IQdataCache.index] = parseInt(tmp[1]);
                this.IQdataCache.index++;
            } else {
                //console.log('shouldnt happen');
            }
        });
        //console.log('IQdataCache after length: ' + this.IQdataCache.index);
    }

    updateIQdataStore() {
        let newDataLength = this.IQdataCache.index - this.IQdataCache.processedIQ;
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
        this.IQdataCache.processedIQ = this.IQdataCache.index;
        this.IQdata = data;
    }

    updateFftStore() {
        let data = {
            real: this.IQdata.real.slice(0),
            imag: this.IQdata.imag.slice(0)
        };

        this.fft.preprocess(data);
        this.fft.transform(data.real, data.imag);
        this.fft.shift(data);
        let result = this.fft.computeMagnitudes(data);

        this.fftStore.index = (this.fftStore.index + 1) % this.speedAverage;
        this.fftStore.magnitudes = result.magnitudes;
        this.fftStore.max = result.max;
        this.fftStore.speed[this.fftStore.index] = this.fft.calculateSpeed(result.max, result.magnitudes);
        //console.log(result.magnitudes);
        //console.log(Math.abs(result.max.freq - 256));
        //console.log(this.fftStore.speed[this.fftStore.index]);
        
        this.publishFftResults();
        this.IQdataCache.processedFFT = this.IQdataCache.index;
    }

    publishFftResults() {
        this.magnitudes = this.fftStore.magnitudes.slice(0);
        this.max = this.fftStore.max;
        this.speed = this.fftStore.speed.reduce((a,b) => a + Math.abs(b), 0) / this.fftStore.speed.length;
    }
}