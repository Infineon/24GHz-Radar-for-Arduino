/**
 * @brief 
 * 
 * @file RadarDataProcessor.h
 * @date 2018-07-23
 * 
 * @bug LED1 LOW/HIGH reversed on the sense2gol board
 * @bug Serial print cannot be used in the callback (USIC interrupts possibly mess up Systick interrupts)
 * @bug ADC settling takes unusually long
 */

#ifndef RADAR_DATA_PROCESSOR_H
#define RADAR_DATA_PROCESSOR_H

#include "Sense2GoL.h"
#include "FixedFFTAnalyzer.h"

#define TWO_PI 6.28318530718

/** Constant for convert Doppler frequency to speed. (10 km/h)/(444.4 Hz) = 0.0225 */
#define RATIO_FREQ_TO_SPEED 0.0225
#define RADAR_MAX_BUFFER_SIZE 256

typedef enum
{
    APPROACHING = 0,
    DEPARTING = 1,
    NO_MOTION = 2
} MOTION_t;

/**
 * @struct Results passed back to the user callback
 * 
 */
typedef struct
{
    int16_t dataI[RADAR_MAX_BUFFER_SIZE];
    int16_t dataQ[RADAR_MAX_BUFFER_SIZE];
    /** real parts of I data's FFT spectrum*/
    int16_t realI[RADAR_MAX_BUFFER_SIZE];
    /** imaginary parts of I data's FFT spectrum*/
    int16_t imagI[RADAR_MAX_BUFFER_SIZE];
    int16_t realQ[RADAR_MAX_BUFFER_SIZE];
    int16_t imagQ[RADAR_MAX_BUFFER_SIZE];
    /** power spectrum*/
    int16_t magnitudes[RADAR_MAX_BUFFER_SIZE];
    float speed;
    float phaseShift;
    int maxMagnitude;
    int motion;
} RESULT_t;

class RadarDataProcessorClass
{
  protected:
    Sense2GoL *_radar;

    RESULT_t _result;

    FFTAnalyzer _fft;

    int _fftOrder;

    int _radarFftSize;

    float _freqWidth;

   
   
    MAX_MAG_FRQ_t _maxMagFreq;

    void (*_cb)(RESULT_t *result);



  public:
    bool _available;

    RadarDataProcessorClass(Sense2GoL *radar, void (*cb)(RESULT_t *result));

    ~RadarDataProcessorClass();

    bool available();

    void RadarDataProcessorClass::sampleInQ(void);
    float RadarDataProcessorClass::presencedetection(void);


    /**
   * @brief Task to execute algorithms on the sampled data, runs once after every sampling task is finished.
   * 
   */
    void runAlgorithm();
};

extern RadarDataProcessorClass RadarDataProcessor;

#endif
