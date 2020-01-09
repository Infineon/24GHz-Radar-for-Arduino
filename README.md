
﻿# Infineon's 24GHz Radar Board Sense2GoL for Arduino


This repository integrates [Infineon's](https://www.infineon.com/) Sense2GoL 24GHz Radar into the [Arduino IDE](https://www.arduino.cc/en/main/software).

<img src="https://www.infineon.com/export/sites/default/media/products/Small_Signal_Discretes/sense2goL-Board.JPG_1308556468.jpg" width="300" />

## Contents
- [Contents](#contents)
- [Supported 24GHz Boards](#supported-24ghz-boards)
- [Additional Information](#additional-information)
- [Installation Instructions](#installation-instructions)
    - [Prework for SEGGER J-Link](#prework-for-segger-j-link)
    - [Using Arduino IDE](#using-arduino-ide)
- [Additional Contributors](#additional-contributors)

## Supported 24GHz Boards

* [XMC1300 Sense2GoL](https://www.infineon.com/cms/de/product/evaluation-boards/demo-sense2gol/)

## Additional Information

Please visit also the boards maker homepage page for additional information, e.g. quickstart guides, additional information, etc.:

[http://makeradar.com/](https://www.infineon.com/cms/en/product/promopages/makeradar/)

Additionally, please consult the [releases](https://github.com/Infineon/24GHz-Radar-for-Arduino/releases) for information about the changes and new versions.
This repository is based on the [XMC-for-Arduino](https://github.com/Infineon/XMC-for-Arduino) and mainly integrates the Radar boards only in combination with additional documentation.

## Installation Instructions

### Prework for SEGGER J-Link

In order to use and program the Infineon XMC microcontrollers in the Arduino IDE, [SEGGER J-Link](https://www.segger.com/downloads/jlink) must be installed on your PC. Please follow this link to [SEGGER J-Link](https://www.segger.com/downloads/jlink) and install the J-Link Software and Documentation Pack for your operating system.
If you have already installed '[DAVE™ - Development Platform for XMC™ Microcontrollers](https://www.infineon.com/cms/de/product/microcontroller/32-bit-industrial-microcontroller-based-on-arm-registered-cortex-registered-m/dave-version-4-free-development-platform-for-code-generation/channel.html?channel=db3a30433580b37101359f8ee6963814)', you can skip this step as the respective drivers/programs are already installed on your system.

![J-Link](https://raw.githubusercontent.com/infineon/assets/master/Pictures/J-Link_Packages.png)

### Using Arduino IDE

![Preferences](https://raw.githubusercontent.com/infineon/assets/master/Pictures/Preferences.png)

Paste the following URL into the 'Additional Boards Manager URLs' input field under **File** > **Preferences** to add Infineon's microcontroller boards to the Arduino IDE.

https://github.com/Infineon/Assets/releases/download/current/package_infineon_index.json

Easier to copy (no clickable link):

```
https://github.com/Infineon/Assets/releases/download/current/package_infineon_index.json

```

![Adding a Board JSON](https://raw.githubusercontent.com/infineon/assets/master/Pictures/Preferences_JSON.png)

To install the boards, please navigate to **Tools** > **Board** > **Boards Manager...** and search for `24GHz Radar`. You will find options to install the board files for the microcontrollers. Click "Install" to add the boards to your Arduino IDE.

![Infineon Board Entry](https://raw.githubusercontent.com/infineon/assets/master/Pictures/Boards_Manager_Entry.png)

In the boards list **Tools** > **Board**, the XMC microcontroller boards are added and can be used from now on.


![Board List](https://raw.githubusercontent.com/infineon/assets/master/Pictures/selectBoardArduinoIDE.PNG)


**Important Notes**

* This integration will only work for Arduino IDE >=1.5
* Refer also to the LICENSE.md/txt file for further information
* Arduino 1.8.0 IDE might have problems with the XMC-for-Arduino releases

## Additional Contributors

* [Paul Carpenter](https://github.com/techpaul)
