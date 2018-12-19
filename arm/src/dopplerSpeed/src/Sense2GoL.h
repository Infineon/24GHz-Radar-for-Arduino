/** @file */

#ifndef SENSE2GOL_H
#define SENSE2GOL_H

#include <Arduino.h>

/**Analog channels for reading raw I and Q data. if you connect the output of CH_I and CH_Q to other boards, be sure to choose A0 and A1 on the connected board; on XMC4700 Relax Kit those are P14.0 and P14.1. */
#define CH_I A0
#define CH_Q A1

/** Radar configuration. Default values should be defined by child classes of BGTRadar.*/
typedef struct
{
	int fftSize;
	/** threshold of the FFT spectrum for motion detection */
	int fftThreshold;
	/** one cycle includes ADC sampling, running algorithms, user code, and some idle time*/
	int cycleTime;
	/** Rate of ADC sampling*/
	int samplingRate;
    /** Duration of sampling once */
    int samplingTime;
	/** Time needed for the radar chip to settle after being turned on*/
	int settleTime;
} RADAR_CONFIG_t;

class Sense2GoL
{
    static RADAR_CONFIG_t defaultConfig;

  public:
	friend class RadarDataProcessorClass;
    Sense2GoL(RADAR_CONFIG_t radarConfig = defaultConfig);
    ~Sense2GoL();
    void sampleInQ(int16_t *bufferI, int16_t *bufferQ);
	RADAR_CONFIG_t _config{};

};

#endif