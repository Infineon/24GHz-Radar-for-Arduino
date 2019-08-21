import { observable } from "mobx"

export default class SerialConnectionStore {
    @observable devices = [];
    @observable selectedPort = '';
    @observable portOpen = false;
    @observable agentFound = false;
    @observable object =  'PERSON';
    @observable frequency =  24;
    @observable  RCS=1;
    @observable  gain='100';
    @observable power = 1; 
    @observable distance = 10; 

    
    daemon = undefined;
    serialConsole = undefined
    self = this;

    constructor(daemon, serialConsole) {
        this.daemon = daemon;
        this.serialConsole = serialConsole;
        this.selectDevice = this.selectDevice.bind(this);
        this.changeObject = this.changeObject.bind(this);
        this.changeFrequence = this.changeFrequence.bind(this);
        this.changepower=this.changepower.bind(this);
        this.changedistance=this.changedistance.bind(this);
        this.changeGain=this.changeGain.bind(this);

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

       
    changeObject(object) {
            this.object = object;
            console.log(this.object);

            if (this.object=="PERSON") {
                this.RCS='1';
                this.distance=10;
                console.log(this.RCS);
                
            }
            if (this.object=="CAR") {
                this.RCS='30';
                this.distance=10;

                console.log(this.RCS);

            }
            if (this.object=="AIRPLANE") {
                this.RCS='150';
                this.distance=10;
                console.log(this.RCS);

            }
            if (this.object=="BICYCLE") {
                this.RCS='5';
                this.distance=10;
                console.log(this.RCS);

            }
    
    }
    
    

        
    changeFrequence(frequency){
            this.frequency=frequency;
            console.log(this.frequency);
    }

   
    changepower(power) {
            this.power=power;
        
    }

    changedistance(distance) {
            this.distance=distance;
        
    }
        
    changeGain(gain) {
            this.gain=gain;
            console.log(gain);
        
    }
        
}