# Interactive Radar Tutorial
This tutorial will explain the physical details behind radar to help you understand what is going on, when using radar sensors.

### Overview
1. Electromagnetic Waves: What are EM waves?
2. Radar Equation: The fundamental equation behind radar
3. Doppler Effect: Frequency shift of a moving object
4. IQ Signals: Common data transmission
5. Fourier Transformation: Essential data processing technique

## 1. Electromagnetic Waves
Electromagnetic waves are waves that propagate in free space at the speed of light $$c$$, where $$ c=\frac{λ}{f} = \frac{Wavelength}{Frequency} $$.

As with other waves, electromagnetic (EM) waves exhibit reflection, refraction, diffraction, and polarization. EM waves can be experienced and utilized differently based on their frequency or wavelength. EM waves with wavelengths in the Kilometer range are used for very long distance communications, EM waves with wavelengths in the micrometer range create our visible light spectrum, and EM waves with wavelengths in the picometer range are used for medical investigations and are referred to as Xrays.

![](../assets/images/Snells_law.svg.png ':size=370%')
![](../assets/images/Reflection_angles.svg ':size=170%')
![](../assets/images/One_wave_slit_diffraction_dirichlet_bw.gif ':size=200%')


For mm-wave radar the wavelengths are in the millimeter range, a 24 GHz radar system has a wavelength $$ λ $$ of 

$$
    λ= \frac{c}{f}=\frac{3\cdot 10^5 m/s}{24 GHz}=12.5 mm 
$$.

Antennas in a radar system are used to convert voltages and currents to EM-waves at the sender side and convert EM-waves to voltages and currents on the receiver side.

![](../assets/images/EM_Spectrum_Properties_edit.svg ':size=500%')

## 2. Radar Equation
In  a radar system the EM waves are transmitted from the transmit (TX) antenna then propagate in space until the hit the target to be reflected and head back to be received by the receive (RX) antenna. To detect this reflected signal, it has to be higher than the smallest detectable signal of a radar system. This minimum signal is usually compared to the noise level and this ratio is referred to by the minimum signal to noise ratio ($$ SNR_{min} $$).

The amount of signal power received is quite critical to the radar’s operation as it defines the difference between detectable and undetectable targets. This value is governed by the famous radar equation:

$$
    P_{rx}=\frac{P_{tx} G_{tx} G_{rx} σλ^2}{(4π)^2 R^4}
$$

The radar equation shows how the received power is governed by multiple variables. As expected, the power drops very rapidly with distance which is governed by the term  $$ 1/R^4 $$, where R is the distance between the radar and the target. The power is also governed determined by the gain of the transmit and the receive antennas $$ G_{tx} $$ and $$ G_{rx} $$ this gain is a measure of the efficiency of the antennas plus how much the antennas focuses the energy in the direction of the target. Clearly the received power will also increase by the transmitted power level $$ P_{tx} $$. Targets reflect EM-waves differently, a big metal object will reflect much more energy back than a small tennis ball, this is accounted for in the equation with the radar cross section term σ. Last but not least the $$ λ^2 $$ shows the dependency of the received power on the wavelength/frequency, from the equation this means the higher the frequency the lower the power received.

![](../assets/images/radarops_maxsize.gif ':size=500%')

## 3. Doppler Effect
Most of us have experienced the Doppler Effect in one way or another, the most common is the sudden change in the pitch when an ambulance crosses you.

The Doppler Effect happens when distance between the peaks of the waves get closer to each other (frequency shifts up), this happens if the source of the waves is traveling in the direction of the observer, or if the peaks move further apart (frequency shifts down) if the source is traveling away.

![](../assets/images/Dopplerfrequenz.gif ':size=700%')

This frequency shift f for EM waves can be directly derived from the original wave frequency $$ f_0 $$ and the velocity  $$ v $$ of the wave source relative to the observer:

$$ f=(1+\frac{v}{c}) f_0 $$

A Doppler radar operates by sending a frequency via the transmit antenna which is reflected back by the target to be captured by the receive antenna. If the target is moving this received signal frequency will be shifted based on the speed of motion. The receiver of a Doppler radar uses a specific block (mixer) that produces an output signal based on the transmitted and received signals. The output of this block has a frequency which is equivalent to the absolute difference in the frequency between the transmitted signal and the reflected one, also known as the Doppler shift.

## 4. IQ Signals
IQ signals in the realm of radar and electrical engineering are signals that have the same amplitude and frequency but are shifted 90° or a quarter cycle relative to each other.

### Image

Radar systems will have either real receive stages or complex ones. A real stage would only have one component of the received signal while a complex stage will generate both the I & Q components. There are several advantages of generating the IQ signals and using them for further analyses, however in the case of Doppler radar the IQ signals serve a more basic purpose.

Since a real mixer used in a Doppler radar receiver will give the absolute frequency shift without a direction or sign, it becomes impossible to determine the direction of travel of the target. Using an IQ mixer, which generates both the I & Q signals, and by checking which of the signals is leading in phase the direction of travel can be determined.

## 5. Fourier Transformation

### 5.1. Discrete Fourier Transform
Electrical signals can be visualized in various ways: if you connect a 24 GHz signal from an Infineon chip to a high-speed oscilloscope you will see a sine wave which is a time-domain-signal. If you decide to connect the signal to a spectrum analyzer, what you will see is a line at 24 GHz.

DFT is a mathematical transformation that is used to transform finite discrete signals from the time domain into the frequency domain. Inversely the inverse Fourier transform converts finite discrete signals from the frequency domain to the time domain. 

For a discrete time domain signal of length $$ T $$ and sample time of $$ \Delta t $$ the DFT representation will have a maximum frequency $$ F=\frac{1}{2\Delta t} $$ (Nyquist frequency)and a frequency resolution (also known as bin spacing) $$ \Delta f=\frac{1}{T} $$.

The DFT generates a series of complex numbers, which convey information on the frequency’s magnitude and phase.

### 5.2. Fast Fourier Transform
FFT is an algorithm that transforms a time-domain-sampled signal into its frequency components. In comparison to the DFT, which has a computing complexity given by $$ O(n^2) $$, where n is the length of the series, the computing complexity of the FFT algorithm is given by $$ O(n \cdot log(n) ) $$.

The transformation if applied to real data (non IQ) generates a symmetric data set with positive and negative frequencies where only the positive regions is of interest for radar signal analyses. On the other hand if complex input data is used (IQ where the complex structure is as follows I+iQ) the transformation will generate a positive frequency series extending up to a maximum frequency $$ F=\frac{1}{\Delta t} $$, which is the double of that in a real FFT. This is however in agreement with the Nyquist frequency theorem since applying the FFT to the IQ signals is equivalent to sampling the real part only at doubling the sampling rate.

<iframe width="100%" height="520px" src="../assets/iframes/learnRadar/fftVisualization/index.html"></iframe>

### Image

## Done 🏁
That's it! You're all set up now to start your own projects and explore the world of radar by yourself 💪 Need some inspiration? Here are some [demo projects](useCases.md)


## Sources
Image sources ordered as appeared in the text:

[1] https://commons.wikimedia.org/wiki/File:Snells_law.svg

[2] https://commons.wikimedia.org/wiki/File:Reflection_angles.svg

[3] https://commons.wikimedia.org/wiki/File:One_wave_slit_diffraction_dirichlet_bw.gif

[4] https://commons.wikimedia.org/wiki/File:EM_Spectrum_Properties_edit.svg

[5] https://commons.wikimedia.org/wiki/File:Dopplerfrequenz.gif

[6] https://github.com/jackschaedler/circles-sines-signals


