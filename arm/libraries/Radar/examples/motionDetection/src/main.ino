#include <RadarDataProcessor.h>
#include <Sense2GoL.h>

#define SPECTRUM_SIZE 128 / 2

bool available = false;
int motion;
Sense2GoL *radar;
RadarDataProcessorClass *processor;
int _interruptTimer;
int _timer;

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
  {
    if (motion == APPROACHING)
      Serial.println("approching");
    else if (motion == DEPARTING)
      Serial.println("departing");
    available = false;
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

void callback(RESULT_t *result)
{
  motion = result->motion;
  available = true;
}