#include "RadarDataProcessor.h"
#include "Sense2GoL.h"

#define SPECTRUM_SIZE 128 / 2
bool available = false;
float motion;
Sense2GoL *radar;
RadarDataProcessorClass *processor;
int _interruptTimer;
int _timer;
bool presence =false; 
int presence_wait=80; //4secondes (50ms*20)*4=1sec * 4
int Macro_Motion_level=100;
int Micro_Motion_level=10;

void setup()
{
  Serial.begin(9600);
  radar = new Sense2GoL(/** your config goes here */);
  processor = new RadarDataProcessorClass(radar, callback);

  // configure task to be executed periodically
  _timer = addTask(samplingTask);

  if (_timer < 0 || _timer > NUM_TASKS_VARIANT)
  {
    // error: too many tasks
    return;
  }

  setParam(_timer, _timer);
  setInterval(_timer, (radar->_config).cycleTime);
  startTask(_timer);

  _interruptTimer = addTask(algoTask);

  // use as an interrupt
  setParam(_interruptTimer, _interruptTimer);
  setInterval(_interruptTimer, 1);

  Serial.println("Init done!");
}

void loop()
{
  if (available)
  { delay(50); 
      if(presence==false && motion>Macro_Motion_level){
      presence=true;
      presence_wait=80;
      Serial.print("motion detected");
      Serial.print(" Presence detected Timer=");
      Serial.print(presence_wait/20);
      Serial.println("Secondes");
      }
    else if(presence==true && motion>Micro_Motion_level){
      presence_wait=80;
      Serial.print("motion detected ");
      Serial.print(" Presence detected Timer=");
      Serial.print(presence_wait/20);
      Serial.println("Secondes");
      }    
    else if(presence==true && motion<Micro_Motion_level && presence_wait>0){
      presence_wait=presence_wait-1;
      Serial.print("No motion detected ");
      Serial.print(" Presence detected Timer=");
      Serial.print(presence_wait/20);
      Serial.println("Secondes");
      }    
    else if(presence==true && motion<Micro_Motion_level && presence_wait==0){
      presence_wait=80;
      presence=false;
      Serial.print("No motion ");
      Serial.println("No Presence detected");
  }  
     else {
      Serial.print("No motion ");
      Serial.println("No Presence detected");}
  }
}

void samplingTask()
{
  processor->sampleInQ();
  startTask(_interruptTimer);
}

void algoTask(int taskId, int16_t param)
{
  processor->runAlgorithm();
  deleteTask(_interruptTimer);
}

// this routine shouldn't take too long
void callback(RESULT_t *result)
{
  motion=processor->presencedetection();
  available = true;
}
