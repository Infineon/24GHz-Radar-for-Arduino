import { observable, computed, reaction, action } from "mobx";
import FFTNayuki from "../actions/FFT";

export default class SerialConsoleStore {
  OFFSET_Real = 525;
  OFFSET_Img = 525;
  LEN_MAF = 3;
  LEN_DIR = 5;
  TH_VEL = 0.3;
  LEN_NM = 5;
  LEN_MD = 4;
  TH_MD = 40;
  sampling_freq_hz = 3000;
 
  //Timer

  @observable Timer_vel =0;
  @observable presence="false";
  @observable color="";
  @observable moyenne=[];;
  //Init data buffers
  v_buf_MAF = new Array(this.LEN_MAF).fill(0);
  v_buf_DIR = new Array(this.LEN_DIR).fill(0);
  v_buf_VEL = new Array(this.LEN_DIR).fill(0);
  v_buf_VEL_2 = new Array(this.LEN_NM).fill(0);
  @observable v_buf_MD =[];
  @observable v_buf_MD_mean = 0;
  //Init DEBUG data buffers
  @observable src='./src/components/2.png';
  //
  DEBUG_V = [];
  DEBUG_I = [];
  DEBUG_Q = [];
  DEBUG_presence = [];
  DEBUG_v_mean = [];
  //velocity
  @observable v=0;
  @observable PAPR=0;

  //
  fftThreshold = 128;
  IQdataThreshold = 128;
  unprocessedThreshold = 150;
  fftLength = 128;
  IQplotLength = 4;
  speedAverage = 4;

  daemon = undefined;
  processedIndex = 0;
  messages = "";
  lineSeparator = "\n";
  @observable emptyCount = 0;


  @observable speed = 0;
  @observable result = {
    max: 0,
    velocity: 0,
    magnitudes: []
  };

  @observable IQdata = {
    real: new Array(this.fftLength).fill(0),
    imag: new Array(this.fftLength).fill(0)
  };

  @observable IQ = {
    real: new Array(this.fftLength).fill(0),
    imag: new Array(this.fftLength).fill(0)
  };

  @observable IQ_mean_abs = 0;

  @observable IQdataCache = {
    index: 0,
    processedIQ: 0,
    processedFFT: 0,
    real: new Array(this.fftLength * this.IQplotLength).fill(0),
    imag: new Array(this.fftLength * this.IQplotLength).fill(0)
  };

  fftStore = {
    index: 0,
    magnitudes: [], //new Array(this.fftLength),
    max: 0,
    speed: new Array(this.speedAverage)
  };
  //Timer//
  @observable temps=5;
  @observable delay=0;

  @observable sensibility=3.7;
  @observable threshold=10;
  @observable number=0;


  
  Start_Stop=false;





  constructor(daemon) {
    this.daemon = daemon;
    this.fft = new FFTNayuki();

    this.addMessage = this.addMessage.bind(this);
    this.updateLineSeparator = this.updateLineSeparator.bind(this);
    this.processMessages = this.processMessages.bind(this);
    this.updateFftStore = this.updateFftStore.bind(this);
    this.updateTimer=this.updateTimer.bind(this);
    this.changesensibility=this.changesensibility.bind(this);
    this.changethreshold=this.changethreshold.bind(this);
    this.start=this.start.bind(this);


  }
  start(start){
    this.Start_Stop=start;
    console.log(start);
}
  addMessage(message) {
    if(this.Start_Stop==true){

      if (this.messages.length > 3000) {
        this.messages = this.messages.substr(message.length);
        this.processedIndex -= message.length;
     }
      this.messages += message;

      if (
        this.messages.length - this.processedIndex >
        this.unprocessedThreshold
      ) {
        //console.log('messages length: ' + this.messages.length);
        //console.log('processing messages');

        this.processMessages();
      }
    }
  }

  clearMessages() {
    this.messages = "";
  }

  updateLineSeparator(lineSeparator) {
    this.lineSeparator = lineSeparator;
    console.log("new separator");
  }

  @computed get text() {
    return this.messages;
  }

  processMessages() {
    if(this.Start_Stop==true){
      let unprocessedMessages = this.messages
        .substr(this.processedIndex)
        .split(/[\r|\r\n|\n]+/);
      let remainder = unprocessedMessages.splice(-1, 1);
      this.processedIndex = this.messages.length - remainder[0].length;
      unprocessedMessages = unprocessedMessages.filter(el =>
        el.match(/^\d+[ ]+\d+$/)
      );

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
          console.log("shouldnt happen");
        }
      });
      if(this.v_buf_MD_mean>this.threshold){
       this.presence="true";
      }
     this.micromotion();
     this.velocity();
      setTimeout(this.detection.bind(this),1000);
    }
    console.log(this.v_buf_MD_mean);
  }

  micromotion() {
    let data = {
      real: this.IQdataCache.real.slice(0),
      imag: this.IQdataCache.imag.slice(0)
    };
    let IQmean = {
      real: 0,
      imag: 0
    };

    for (let i = 0; i < this.IQ.real.length; i++) {
      this.IQ.real[i] = data.real[i] - this.OFFSET_Real;
      IQmean.real += this.IQ.real[i] / this.IQ.real.length;
      this.IQ.imag[i] = data.imag[i] - this.OFFSET_Img;
      IQmean.imag += this.IQ.imag[i] / this.IQ.real.length;
    }
    
    this.IQ_mean_abs = Math.abs(IQmean.real) + Math.abs(IQmean.imag);   
    if(3<this.v_buf_MD.length){
      this.v_buf_MD.shift();
    }


    this.v_buf_MD.push(this.IQ_mean_abs);


    this.v_buf_MD_mean = this.v_buf_MD[0]/this.v_buf_MD.length;

    for (let i=1;i<this.v_buf_MD.length;i++){
      this.v_buf_MD_mean+=this.v_buf_MD[i]/this.v_buf_MD.length;
    }

  }

  velocity(){
    let data = {
      real: this.IQdataCache.real.slice(0),
      imag: this.IQdataCache.imag.slice(0)
    };

    this.fft.removeMean(data.real);
    this.fft.removeMean(data.imag);

    this.fft.applyWindow(data.real);
    this.fft.applyWindow(data.imag);

   
    data.real = this.fft.zeroPadding(data.real,8);
    data.imag = this.fft.zeroPadding(data.imag, 8);

 
    this.fft.transform(data.real, data.imag) ;
    this.fft.shift(data);
    
    let max=0;
    let amplitudes=[]; 
    let II=-1;
    let amplitudes_db=[]; 
    let spectrum_dBm_mean=0;
    // ampliudes - max ampl -max_freq
    for (let i=0;i<data.real.length;i++){
      let m=Math.sqrt(Math.pow(data.real[i],2)+ Math.pow(data.imag[i],2));  
      amplitudes.push(m);
      amplitudes_db.push(20*Math.log10(m));
      spectrum_dBm_mean+=20*Math.log10(m)/data.real.length;
      if (max<m){
        max=m;
        II=i;
      }
    }
    
    let ln=[]; 
    let f=[]; 
    let NFFT=128* 2*4;
    for (let i=0;i<NFFT;i++){
      let x=-1+2*i/(NFFT-1);
      ln.push(x);
      f.push(3000/(2*x));
    }
    this.PAPR = Math.pow(amplitudes_db[II],2)/Math.pow(spectrum_dBm_mean,2);
    let freq=f[II];

    if (this.PAPR>2.5){
        this.v=0;
        this.z="Stationary";
    }else {
      this.v = Math.round((freq/2) * (3e8 / 24e9), 2);
      if(freq<0) 
        this.z="Approching";
      else 
        this.z="Departing";
    }
   
  }

  detection(){
    if (this.delay!=0){
    this.number=this.temps-parseInt(this.delay /20);
    }
    else {
      this.number=0;
    }
    if (this.presence=="false"){
      this.color= "#ED1941";
      return;
    }

    else if (this.presence=="true"&& this.v_buf_MD_mean>this.threshold ){
      this.delay=0;
      this.color= "#00FF00";
      this.startTimer();

      return;
    }
    
    else if (this.v_buf_MD_mean>this.sensibility && this.presence=="true"){
      this.delay=0;
      this.color="#00FF00";
      this.startTimer();
      return;
    }else if (this.v_buf_MD_mean<this.sensibility && this.presence=="true" && this.delay<(this.temps*20)){
      this.color= "#00FF00";
      this.startTimer();
	
      return;
    }else if (this.v_buf_MD_mean<this.sensibility && this.presence=="true" && this.delay ==(this.temps*20)){
      this.presence="false";
      this.color= "#ED1941";
      this.delay=0;
      return;
    }
  }
  updateIQdataStore() {
    let newDataLength = this.IQdataCache.index - this.IQdataCache.processedIQ;
    let data = {
      real: this.IQdata.real.slice(0),
      imag: this.IQdata.imag.slice(0)
    };
      //this.moyenne=[];
    for (let i = 0; i < data.real.length; i++) {
      if (i < data.real.length - newDataLength) {
        data.real[i] = data.real[i + newDataLength];
        data.imag[i] = data.imag[i + newDataLength];
        //this.moyenne.push((data.real[i]+ data.imag[i])/2);
      } else {
        data.real[i] = this.IQdataCache.real[
          i - data.real.length + newDataLength
        ];
        data.imag[i] = this.IQdataCache.imag[
          i - data.imag.length + newDataLength
        ];
        //this.moyenne.push((data.real[i - data.real.length + newDataLength]+ data.imag[i - data.real.length + newDataLength])/2);
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

    /*let result = this.fft.computeMagnitudes(data);

        this.fftStore.index = (this.fftStore.index + 1) % this.speedAverage;
        this.fftStore.magnitudes = result.magnitudes;
        this.fftStore.max = result.max;
        this.fftStore.speed[this.fftStore.index] = this.fft.calculateSpeed(result.max, result.magnitudes);
        //console.log(result.magnitudes);
        //console.log(Math.abs(result.max.freq - 256));
        //console.log(this.fftStore.speed[this.fftStore.index]);
        
        this.publishFftResults();
        this.IQdataCache.processedFFT = this.IQdataCache.index;*/
  }

  publishFftResults() {
    this.magnitudes = this.fftStore.magnitudes.slice(0);
    this.max = this.fftStore.max;
    this.speed =
      this.fftStore.speed.reduce((a, b) => a + Math.abs(b), 0) /
      this.fftStore.speed.length;
  }



  updateTimer(temps) {
    this.temps=temps;

  }


    changesensibility(sensibility) {
      this.sensibility=sensibility;
  
    }


    changethreshold(threshold) {
        this.threshold=threshold;
    
    }


    tick () {
     this.delay+=1;
    }
    startTimer () {
      
      setInterval(this.tick(), 1000)
    }
}
