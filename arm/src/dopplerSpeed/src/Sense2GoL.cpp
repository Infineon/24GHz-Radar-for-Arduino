#include "Sense2GoL.h"

RADAR_CONFIG_t Sense2GoL::defaultConfig = {
    fftSize : 128,      // Sense2GoL Buffer Size
    fftThreshold : 100, // Sense2GoL Magnitude Threshold

    /** Cycle time must be larger than t_sampling * no_samples + adc_settle_time */
    cycleTime : 140,     // Sense2GoL Cycle Time
    samplingRate : 1408, // Sense2GoL Sampling Rate

    /** Time (us) for the ADC of one single sample; e.g: f_adc = 1.408kHz -> 1/f_adc = 710 us, with a buffer size of 128: 710*128 = 90880 us = 90.88 ms */
    samplingTime : int(1000000 / 1408), // Sense2GoL Sampling Time

    /**  A delay is needed for the chip to settle after being turned on. You might turn on/off the chip only for a fraction of the duty cycle in order to save energy, in which case you need to make sure that 
    * this constant, as well as the cycle time, is set appropriately (from my experiments it should be around 200 ms, then the cycle time should be more than 300 ms). This has no effect if the chip is left on all time. */
    settleTime : 220000 // Sense2GoL Settle Time
};

Sense2GoL::Sense2GoL(RADAR_CONFIG_t radarConfig)
{
    _config = radarConfig;

    // turn on radar
    #ifdef XMC1300_Sense2GoL
    pinMode(BGT_ON, OUTPUT);
    digitalWrite(BGT_ON, LOW);
    #endif
    analogReadResolution(12u);
}

Sense2GoL::~Sense2GoL() {}

void Sense2GoL::sampleInQ(int16_t *bufferI, int16_t *bufferQ)
{
    for (uint16_t i = 0; i < _config.fftSize; i++)
    {
        bufferI[i] = analogRead(CH_I);
        bufferQ[i] = analogRead(CH_Q);
        delayMicroseconds(_config.samplingTime);
    }
}