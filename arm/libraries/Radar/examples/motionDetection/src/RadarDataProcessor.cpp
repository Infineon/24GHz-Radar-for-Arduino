#include "RadarDataProcessor.h"

RadarDataProcessorClass::RadarDataProcessorClass(Sense2GoL *radar, void (*cb)(RESULT_t *result))
{
    _fft = FFTAnalyzer();
    _maxMagFreq = {0, 0};
    _result.speed = 0.0;
    _result.maxMagnitude = 0;
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

    initHanningWindow(_radarFftSize);
    _freqWidth = (_radar->_config).samplingRate / _radarFftSize;

}

RadarDataProcessorClass::~RadarDataProcessorClass() {}

bool RadarDataProcessorClass::available()
{
    return _available;
}

void RadarDataProcessorClass::initHanningWindow(uint8_t windowLength)
{
    // w(n) = 0.5 (1-cos(2*pi*n/(N-1))), 0<=n<=(N-1)
    float frac = TWO_PI / (windowLength - 1);
    for (int i = 0; i < windowLength; i++)
        _hanningWindow[i] = round(32767 * (1 - cos(i * frac))) >> 1;
}

void RadarDataProcessorClass::sampleInQ(void)
{
    // only need to sum up I data
    _radar->sampleInQ(_result.dataI, _result.dataQ);
}

void RadarDataProcessorClass::runAlgorithm()
{
    detectMotion();

    // user callback
    if (_cb)
    {
        _cb(&_result);
    }

    _available = true;
}

void RadarDataProcessorClass::detectMotion()
{
    // mean removal
    int sum = 0;
    for (int i = 0; i < _radarFftSize; i++)
    {
        sum += _result.dataI[i];
    }
    sum = sum >> _fftOrder;

    // windowing -> move to fft analyzer
    for (int i = 0; i < _radarFftSize; i++)
    {
        _result.realI[i] = FIX_MPY((_result.dataI[i] - sum), _hanningWindow[i]);
        _result.imagI[i] = 0;
    }

    // in-place fft
    _fft.fix_fft(_result.realI, _result.imagI, _fftOrder, 0);

    //the first half of real fft values replaced by power spectrum
    _maxMagFreq = _fft.compute_magnitude(_result.realI, _result.imagI, _result.magnitudes, _radarFftSize / 2);
    bool detected = _maxMagFreq.mag > (_radar->_config).fftThreshold;

    if (detected)
        _result.speed = (RATIO_FREQ_TO_SPEED * _freqWidth * _maxMagFreq.freq);
    else
        _result.speed = 0;
    _result.maxMagnitude = _maxMagFreq.mag;
}