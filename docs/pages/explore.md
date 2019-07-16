# Explore your boards skills

<script>
    var myLazyLoad = new LazyLoad({
      elements_selector: ".lazy"
    });
</script>

## 1. Before you start
To recognize your board and be able to talk to it, there's just three quick things to do.

1. Install [Arduino Create Agent](https://github.com/arduino/arduino-create-agent/blob/devel/README.md)
2. In the installation directory of `Arduino Create Agent`, edit the `config.ini` and add `http://howto.makeradar.com` to `origins`.
The line should look like this then:
``` 
origins =  http://local.arduino.cc:8000, http://howto.makeradar.com
```
3. Restart `Arduino Create Agent` for the new config to take effect. This is done by a right click on the Arduino icon in the taskbar ![](../assets/images/agentTaskbar.png)
. Click `Pause Plugin`, rightclick again and choose `Kill Plugin`. After that, run `Arduino_Create_Agent_Bridge.exe` from your installation directory.


## 2. Play with the raw data
Select your board and baud rate and open the port to see the raw data ([Having trouble?](explore?id=Troubleshooting)). Try moving your hand or objects in front of the board and observe how the data changes. **Start experimenting!**
<iframe class="lazy" width="100%" height="600px" src="../assets/iframes/explore/showRawData/index.html"></iframe>


## 3. Watch the speedometer
Select your board and baud rate and open the port to start measuring the speed ([Having trouble?](explore?id=Troubleshooting)). Move your hand up and down above the board. Vary the speed and watch the changes on the speedometer. **Start experimenting!**

<iframe class="lazy" width="100%" height="870px" src="../assets/iframes/explore/showSpeed/index.html"></iframe>

## 4. Get to know FFT
Select your board and baud rate and open the port to see the FFT data ([Having trouble?](explore?id=Troubleshooting)). Try moving objects in front your board at different speeds to see FFT changes. **Start experimenting!**

<iframe class="lazy" width="100%" height="600px" src="../assets/iframes/explore/showFFT/index.html"></iframe>

## 5. Door Opener
Select your board and baud rate and open the port to start the door opener ([Having trouble?](explore?id=Troubleshooting)). Approach your board (either with your hand or your body) and the door will open. Stand still or depart and it will close again. **Start experimenting!**

<iframe class="lazy" width="100%" height="620px" src="../assets/iframes/explore/doorOpener/index.html"></iframe>

## X. Raw data console
<iframe class="lazy" width="100%" height="510px" src="../assets/iframes/explore/rawDataConsole/index.html"></iframe>

## Troubleshooting
### 1. I can't find my board
**Make sure Create Agent is running**

Check if you can find the Arduino icon in the taskbar (it might be hidden behind the arrow).

![](../assets/images/agentTaskbar.png)

**Check if your computer recognized the board**

All boards connectecd to COM ports should appear on the interface. If you can't find your board, check the device manager of your operating system to find out if your board is properly detected by your computer.

On Windows it should look like this:

![](../assets/images/deviceManager.png)


### 2. I don't know my baud rate
With the default firmware, the board communicates over the Serial port with 38400 baud. Unless you made any changes, you can just go with the 38400 baud default. Otherwise adapt it to your configuration.

### 3. I don't see any data
If you are able to select port and baud rate, but nothing happens after opening the port, this is how you can fix it:

**Verify the baud rate**
If you are using the wrong Baud rate, you will not see any data. See the previous question to find out the correct Baud rate.

**Make sure you are using the Sense2GoL _Make_**

Only the Sense2GoL **Make** ships with the right firmware. If you are usiing the *normal* Sense2GoL, you have to flash the right firmware before starting off (see below).

**Flash the correct firmware**

Follow [this guide](/develop?id=_1-setting-up-the-environment) to setup the IDE of your choice and install SEGGER J-Link. After that, uploading the following code to your board installs the right firmare:
```arduino
#include <Arduino.h>

void setup()
{
  Serial.begin(38400);
  Serial.println("Init done!");

  // Only necessary when directly communicating with the board
  pinMode(BGT_ON, OUTPUT);
  digitalWrite(BGT_ON, LOW); // Turn on the board
}

void loop()
{
  Serial.print(analogRead(CH_I));   // Read and print I
  Serial.print(' ');
  Serial.println(analogRead(CH_Q)); // Read and print Q
}
```
