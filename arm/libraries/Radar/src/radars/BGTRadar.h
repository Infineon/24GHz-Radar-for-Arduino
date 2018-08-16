
#ifndef BGT_RADAR_H
#define BGT_RADAR_H
#include <Arduino.h>

/** Radar configuration. Default values should be defined by child classes of BGTRadar.*/
typedef struct
{
	int fft_size;
	/** one cycle includes ADC sampling, running algorithms, user code, and some idle time*/
	int cycle_time;
	/** Rate of ADC sampling*/
	int sampling_rate;
	/** Time needed for the radar chip to settle after being turned on*/
	int settle_time;
} BGT_RADAR_CONFIG_t;

typedef struct
{
	int magnitude_thresh;
} BGT_ALGO_PARAMS_t;


class RadarDataProcessorClass;

/** @class BGTRadar Base class for different types of radars  */
class BGTRadar
{
  public:
	BGTRadar();
	~BGTRadar();
	virtual void begin() = 0;

	virtual void startAcq(void) = 0;

	virtual void endAcq(void) = 0;

	virtual void sampleInQ(int16_t *bufferI, int16_t *bufferQ) = 0;

	// TODO: set algorithm parameters
	void setConfig(BGT_RADAR_CONFIG_t config);

  protected:
	friend class RadarDataProcessorClass;

	BGT_RADAR_CONFIG_t _config{};

	/**
	 * @brief Parameters for data processing algorithms. Defined here (not in RadarDataProcessor) since these may vary from radar to radar.
	 */
	BGT_ALGO_PARAMS_t _algoParams{};
	
	int _samplingTime;
};

#endif