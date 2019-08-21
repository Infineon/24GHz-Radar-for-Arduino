#include "RadarDataProcessor.h"

RadarDataProcessorClass::RadarDataProcessorClass(Sense2GoL *radar, void (*cb)(RESULT_t *result))
{
    
    _result.motion = 0;
    _radar = radar;

    if (cb)
        _cb = cb;

    // check initialization
    if (!_radar)
        return;

    _radarFftSize = (_radar->_config).fftSize;
    if (_radarFftSize > RADAR_MAX_BUFFER_SIZE)
        _radarFftSize = RADAR_MAX_BUFFER_SIZE;

    _fftOrder = log2(_radarFftSize);
    if (_radarFftSize <= 0)
        return;


}

RadarDataProcessorClass::~RadarDataProcessorClass() {}

bool RadarDataProcessorClass::available()
{
    return _available;
}


void RadarDataProcessorClass::sampleInQ(void)
{
    // only need to sum up I data
    _radar->sampleInQ(_result.dataI, _result.dataQ);
}

float RadarDataProcessorClass::presencedetection(void){

 float OFFSET_I=2092;
 float OFFSET_Q=2092;
 float I_OFFSET=0;
 float Q_OFFSET=0;
 float I_mean=0;
 float Q_mean=0;

 for ( int i=0;i<RADAR_MAX_BUFFER_SIZE/2;i++){
  I_OFFSET=abs(_result.dataI[i]-OFFSET_I);
  Q_OFFSET=abs( _result.dataQ[i]-OFFSET_Q);
  I_mean=I_mean+2*I_OFFSET/RADAR_MAX_BUFFER_SIZE;
  Q_mean=Q_mean+2*Q_OFFSET/RADAR_MAX_BUFFER_SIZE;

}
 float motion=sqrt(I_mean*I_mean+Q_mean*Q_mean);
 return motion;
}


void RadarDataProcessorClass::runAlgorithm()
{

    // user callback
    if (_cb)
    {
        _cb(&_result);
    }

    _available = true;
}
