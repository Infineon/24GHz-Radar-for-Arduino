import { observable } from "mobx"

export default class SerialConnectionStore {
    @observable devices = [];
    @observable selectedPort = '';
    @observable portOpen = false;
    @observable agentFound = false;
    @observable object =  'Person';
    @observable object_img =  "../../../images/pedestrian.png";
    @observable frequency =  '24';
    @observable   RCS=1;
    @observable  GTx='10';
    @observable power = 1; 
    @observable distance = 20; 

    
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
        this.change=this.change.bind(this);
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

            if (this.object=="Person") {
                this.object_img= "../../../images/pedestrian.png";
                this.RCS='1';
                console.log(this.RCS);
                
            }
            if (this.object=="Car") {
                this.object_img= "../../../images/Car.png";
                this.RCS='100';
                console.log(this.RCS);

            }
            if (this.object=="Bus") {
                this.object_img= "../../../images/Bus.png";
                this.RCS='200';
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

        change(translateX){
            this.distance=Math.round(translateX*100/384+49.22)
        }
}