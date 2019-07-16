/* 
 * Free FFT and convolution (JavaScript)
 * 
 * Copyright (c) 2014 Project Nayuki
 * http://www.nayuki.io/page/free-small-fft-in-multiple-languages
 *
 * (MIT License)
 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 *
 *  Slightly restructured by Chris Cannam, cannam@all-day-breakfast.com
 *  
 */

"use strict";

/* 
 * Construct an object for calculating thefft_size discrete Fourier transform (DFT) of size n, where n is a power of 2.
 */

export default class FFTNayuki {
    constructor() {
        // Sense2GoL data
        this.fft_size = 128;
        this.fft_threshold = 100;
        this.cycle_time = 140;
        this.sampling_rate = 1408;
        this.settle_time = 220000;
        this.freqWidth = this.sampling_rate / this.fft_size;
        this.fftOrder = Math.log2(this.fft_size);
        this.freqToSpeedRatio = 0.0225;

        this.n_wave = 1024;    /* full length of Sinewave[] */
        this.log2_n_wave = 10;

        this.Sinewave = [
            0, 201, 402, 603, 804, 1005, 1206, 1406,
            1607, 1808, 2009, 2209, 2410, 2610, 2811, 3011,
            3211, 3411, 3611, 3811, 4011, 4210, 4409, 4608,
            4807, 5006, 5205, 5403, 5601, 5799, 5997, 6195,
            6392, 6589, 6786, 6982, 7179, 7375, 7571, 7766,
            7961, 8156, 8351, 8545, 8739, 8932, 9126, 9319,
            9511, 9703, 9895, 10087, 10278, 10469, 10659, 10849,
            11038, 11227, 11416, 11604, 11792, 11980, 12166, 12353,
            12539, 12724, 12909, 13094, 13278, 13462, 13645, 13827,
            14009, 14191, 14372, 14552, 14732, 14911, 15090, 15268,
            15446, 15623, 15799, 15975, 16150, 16325, 16499, 16672,
            16845, 17017, 17189, 17360, 17530, 17699, 17868, 18036,
            18204, 18371, 18537, 18702, 18867, 19031, 19194, 19357,
            19519, 19680, 19840, 20000, 20159, 20317, 20474, 20631,
            20787, 20942, 21096, 21249, 21402, 21554, 21705, 21855,
            22004, 22153, 22301, 22448, 22594, 22739, 22883, 23027,
            23169, 23311, 23452, 23592, 23731, 23869, 24006, 24143,
            24278, 24413, 24546, 24679, 24811, 24942, 25072, 25201,
            25329, 25456, 25582, 25707, 25831, 25954, 26077, 26198,
            26318, 26437, 26556, 26673, 26789, 26905, 27019, 27132,
            27244, 27355, 27466, 27575, 27683, 27790, 27896, 28001,
            28105, 28208, 28309, 28410, 28510, 28608, 28706, 28802,
            28897, 28992, 29085, 29177, 29268, 29358, 29446, 29534,
            29621, 29706, 29790, 29873, 29955, 30036, 30116, 30195,
            30272, 30349, 30424, 30498, 30571, 30643, 30713, 30783,
            30851, 30918, 30984, 31049, 31113, 31175, 31236, 31297,
            31356, 31413, 31470, 31525, 31580, 31633, 31684, 31735,
            31785, 31833, 31880, 31926, 31970, 32014, 32056, 32097,
            32137, 32176, 32213, 32249, 32284, 32318, 32350, 32382,
            32412, 32441, 32468, 32495, 32520, 32544, 32567, 32588,
            32609, 32628, 32646, 32662, 32678, 32692, 32705, 32717,
            32727, 32736, 32744, 32751, 32757, 32761, 32764, 32766,
            32767, 32766, 32764, 32761, 32757, 32751, 32744, 32736,
            32727, 32717, 32705, 32692, 32678, 32662, 32646, 32628,
            32609, 32588, 32567, 32544, 32520, 32495, 32468, 32441,
            32412, 32382, 32350, 32318, 32284, 32249, 32213, 32176,
            32137, 32097, 32056, 32014, 31970, 31926, 31880, 31833,
            31785, 31735, 31684, 31633, 31580, 31525, 31470, 31413,
            31356, 31297, 31236, 31175, 31113, 31049, 30984, 30918,
            30851, 30783, 30713, 30643, 30571, 30498, 30424, 30349,
            30272, 30195, 30116, 30036, 29955, 29873, 29790, 29706,
            29621, 29534, 29446, 29358, 29268, 29177, 29085, 28992,
            28897, 28802, 28706, 28608, 28510, 28410, 28309, 28208,
            28105, 28001, 27896, 27790, 27683, 27575, 27466, 27355,
            27244, 27132, 27019, 26905, 26789, 26673, 26556, 26437,
            26318, 26198, 26077, 25954, 25831, 25707, 25582, 25456,
            25329, 25201, 25072, 24942, 24811, 24679, 24546, 24413,
            24278, 24143, 24006, 23869, 23731, 23592, 23452, 23311,
            23169, 23027, 22883, 22739, 22594, 22448, 22301, 22153,
            22004, 21855, 21705, 21554, 21402, 21249, 21096, 20942,
            20787, 20631, 20474, 20317, 20159, 20000, 19840, 19680,
            19519, 19357, 19194, 19031, 18867, 18702, 18537, 18371,
            18204, 18036, 17868, 17699, 17530, 17360, 17189, 17017,
            16845, 16672, 16499, 16325, 16150, 15975, 15799, 15623,
            15446, 15268, 15090, 14911, 14732, 14552, 14372, 14191,
            14009, 13827, 13645, 13462, 13278, 13094, 12909, 12724,
            12539, 12353, 12166, 11980, 11792, 11604, 11416, 11227,
            11038, 10849, 10659, 10469, 10278, 10087, 9895, 9703,
            9511, 9319, 9126, 8932, 8739, 8545, 8351, 8156,
            7961, 7766, 7571, 7375, 7179, 6982, 6786, 6589,
            6392, 6195, 5997, 5799, 5601, 5403, 5205, 5006,
            4807, 4608, 4409, 4210, 4011, 3811, 3611, 3411,
            3211, 3011, 2811, 2610, 2410, 2209, 2009, 1808,
            1607, 1406, 1206, 1005, 804, 603, 402, 201,
            0, -201, -402, -603, -804, -1005, -1206, -1406,
            -1607, -1808, -2009, -2209, -2410, -2610, -2811, -3011,
            -3211, -3411, -3611, -3811, -4011, -4210, -4409, -4608,
            -4807, -5006, -5205, -5403, -5601, -5799, -5997, -6195,
            -6392, -6589, -6786, -6982, -7179, -7375, -7571, -7766,
            -7961, -8156, -8351, -8545, -8739, -8932, -9126, -9319,
            -9511, -9703, -9895, -10087, -10278, -10469, -10659, -10849,
            -11038, -11227, -11416, -11604, -11792, -11980, -12166, -12353,
            -12539, -12724, -12909, -13094, -13278, -13462, -13645, -13827,
            -14009, -14191, -14372, -14552, -14732, -14911, -15090, -15268,
            -15446, -15623, -15799, -15975, -16150, -16325, -16499, -16672,
            -16845, -17017, -17189, -17360, -17530, -17699, -17868, -18036,
            -18204, -18371, -18537, -18702, -18867, -19031, -19194, -19357,
            -19519, -19680, -19840, -20000, -20159, -20317, -20474, -20631,
            -20787, -20942, -21096, -21249, -21402, -21554, -21705, -21855,
            -22004, -22153, -22301, -22448, -22594, -22739, -22883, -23027,
            -23169, -23311, -23452, -23592, -23731, -23869, -24006, -24143,
            -24278, -24413, -24546, -24679, -24811, -24942, -25072, -25201,
            -25329, -25456, -25582, -25707, -25831, -25954, -26077, -26198,
            -26318, -26437, -26556, -26673, -26789, -26905, -27019, -27132,
            -27244, -27355, -27466, -27575, -27683, -27790, -27896, -28001,
            -28105, -28208, -28309, -28410, -28510, -28608, -28706, -28802,
            -28897, -28992, -29085, -29177, -29268, -29358, -29446, -29534,
            -29621, -29706, -29790, -29873, -29955, -30036, -30116, -30195,
            -30272, -30349, -30424, -30498, -30571, -30643, -30713, -30783,
            -30851, -30918, -30984, -31049, -31113, -31175, -31236, -31297,
            -31356, -31413, -31470, -31525, -31580, -31633, -31684, -31735,
            -31785, -31833, -31880, -31926, -31970, -32014, -32056, -32097,
            -32137, -32176, -32213, -32249, -32284, -32318, -32350, -32382,
            -32412, -32441, -32468, -32495, -32520, -32544, -32567, -32588,
            -32609, -32628, -32646, -32662, -32678, -32692, -32705, -32717,
            -32727, -32736, -32744, -32751, -32757, -32761, -32764, -32766,
        ];

        this.cosTable = new Array(this.fft_size / 2);
        this.sinTable = new Array(this.fft_size / 2);

        for (let i = 0; i < this.fft_size / 2; i++) {
            this.cosTable[i] = Math.cos(2 * Math.PI * i / this.fft_size);
            this.sinTable[i] = Math.sin(2 * Math.PI * i / this.fft_size);
        }
    }

    removeMean(data) {
        let sum = data.reduce((acc, el) => acc + el, 0) / data.length;

        //sum = sum >> Math.log2(this.fftOrder);

        for (let i = 0; i < data.length; i++) {
            data[i] -= sum;
        }
    }

    applyWindow(data) {
        const frac = 2 * Math.PI / (data.length);
        for (let i = 0; i < data.length; i++) {
            // data[i] = data[i] / 2 * Math.round(32767 * (1 - Math.cos(i * frac)));
            data[i] = data[i] * 0.5 * (1 - Math.cos(i * frac));
        }
    }

    zeroPadding(data, factor) {
        let result = new Array(data.length * factor);

        for (let i = 0; i < result.length; i++) {
            if (i < data.length) {
                result[i] = data[i];
            } else {
                result[i] = 0;
            }
        }
        return result;
    }

    preprocess(data) {
        let real = data.real;
        let imag = data.imag;

        this.removeMean(real)
        this.removeMean(imag)

        this.applyWindow(real);
        this.applyWindow(imag);

        data.real = this.zeroPadding(real, 4);
        data.imag = this.zeroPadding(imag, 4);
    }

    forward2(data) {
        let mr, nn, i, j, l, k, istep, n, scale, shift;
        let qr, qi, tr, ti, wr, wi;

        let fr = data.real;
        let fi = data.imag;
        let m = this.fftOrder;
        const inverse = 0;

        n = 1 << m;

        /* max FFT size = N_WAVE */
        if (n > this.n_wave) {
            return -1;
        }

        mr = 0;
        nn = n - 1;
        scale = 0;

        /* decimation in time - re-order data */
        for (m = 1; m <= nn; ++m) {
            l = n;
            do {
                l >>= 1;
            } while (mr + l > nn);
            mr = (mr & (l - 1)) + l;

            if (mr <= m)
                continue;
            tr = fr[m];
            fr[m] = fr[mr];
            fr[mr] = tr;
            ti = fi[m];
            fi[m] = fi[mr];
            fi[mr] = ti;
        }

        l = 1;
        k = this.log2_n_wave - 1;
        while (l < n) {
            if (inverse) {
                /* variable scaling, depending upon data */
                shift = 0;
                for (i = 0; i < n; ++i) {
                    j = fr[i];
                    if (j < 0)
                        j = -j;
                    m = fi[i];
                    if (m < 0)
                        m = -m;
                    if (j > 16383 || m > 16383) {
                        shift = 1;
                        break;
                    }
                }
                if (shift)
                    ++scale;
            } else {
                /*
                  fixed scaling, for proper normalization --
                  there will be log2(n) passes, so this results
                  in an overall factor of 1/n, distributed to
                  maximize arithmetic accuracy.
                */
                shift = 1;
            }
            /*
              it may not be obvious, but the shift will be
              performed on each data point exactly once,
              during this pass.
            */
            istep = l << 1;
            for (m = 0; m < l; ++m) {
                j = m << k;
                /* 0 <= j < N_WAVE/2 */
                wr = this.Sinewave[j + this.n_wave / 4];
                wi = -this.Sinewave[j];
                if (inverse)
                    wi = -wi;
                if (shift) {
                    wr >>= 1;
                    wi >>= 1;
                }
                for (i = m; i < n; i += istep) {
                    j = i + l;
                    tr = (wr * fr[j]) - (wi * fi[j]);
                    ti = (wr * fi[j]) + (wi * fr[j]);
                    qr = fr[i];
                    qi = fi[i];
                    if (shift) {
                        qr >>= 1;
                        qi >>= 1;
                    }
                    fr[j] = qr - tr;
                    fi[j] = qi - ti;
                    fr[i] = qr + tr;
                    fi[i] = qi + ti;
                }
            }
            --k;
            l = istep;
        }
        return { real: fr, imag: fi };
    }

    /* 
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be equal to the size n that was passed to the object constructor, and this must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     */
    forwardDft(data) {
        const n = data.real.length;
        const levels = Math.log2(n);
        let real = data.real;
        let imag = data.imag;

        // Bit-reversed addressing permutation
        for (let i = 0; i < n; i++) {
            const j = reverseBits(i, levels);
            if (j > i) {
                let temp = real[i];
                real[i] = real[j];
                real[j] = temp;
                temp = imag[i];
                imag[i] = imag[j];
                imag[j] = temp;
            }
        }


        // Cooley-Tukey decimation-in-time radix-2 FFT
        for (let size = 2; size <= n; size *= 2) {
            const halfsize = size / 2;
            const tablestep = n / size;
            for (let i = 0; i < n; i += size) {
                for (let j = i, k = 0; j < i + halfsize; j++ , k += tablestep) {
                    const tpre = real[j + halfsize] * this.cosTable[k] +
                        imag[j + halfsize] * this.sinTable[k];
                    const tpim = -real[j + halfsize] * this.sinTable[k] +
                        imag[j + halfsize] * this.cosTable[k];
                    real[j + halfsize] = real[j] - tpre;
                    imag[j + halfsize] = imag[j] - tpim;
                    real[j] += tpre;
                    imag[j] += tpim;
                }
            }
        }


        // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
        function reverseBits(x, bits) {
            let y = 0;
            for (let i = 0; i < bits; i++) {
                y = (y << 1) | (x & 1);
                x >>>= 1;
            }
            return y;
        }

        return { real: real, imag: imag }
    }

    /* 
     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be equal to the size n that was passed to the object constructor, and this must be a power of 2. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
     */

    inverseDft(data) {
        const tmp = data.imag;
        data.imag = data.real;
        data.real = tmp;
        this.forwardDft(data);
    }

    shift(data) {
        const breakpoint = Math.floor(data.real.length / 2);
        let result = { real: new Array(data.real.length), imag: new Array(data.imag.length) };
        for (let i = 0; i < data.real.length; i++) {
            if (i < breakpoint) {
                result.real[i] = data.real[breakpoint + i];
                result.imag[i] = data.real[breakpoint + i];
            } else {
                result.real[i] = data.real[i - breakpoint];
                result.imag[i] = data.real[i - breakpoint];
            }

        }
        data.real = result.real;
        data.imag = result.imag;
    }

    computeMagnitudes(data) {
        const real = data.real;
        const imag = data.imag;

        let mag = 0;
        let max = {
            freq: -1,
            mag: 0
        };
        let magnitudes = [];

        // for (let i = 0; i < real.length / 2; i++) {
        for (let i = 0; i < real.length; i++) {
            //mag = real[i] * real[i] + imag[i] * imag[i];
            //mag = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
            //mag = Math.abs(real[i]);
            mag = Math.abs(real[i]) + Math.abs(imag[i]);

            magnitudes.push(mag);

            if (mag > max.mag) {
                max.freq = i;
                max.mag = mag;
            }
            // magnitudes[i] = mag >> 8;
        }
        //this.max.mag >>= 8;
        return { magnitudes: magnitudes, max: max };
    }

    calculateSpeed(max) {
        // if (this.max.mag > this.fft_threshold) {
        if (max.mag) {
            // return this.freqToSpeedRatio * this.freqWidth * max.freq;
            return max.freq;
        } else {
            return 0;
        }
    }

    get speed() {
        //this.preprocess();
        this.transform();
        this.findMaxMagnitude();
        return this.calculateSpeed();
    }

    /* 
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector can have any length. This is a wrapper function.
 */
    transform(real, imag) {

        // for (let i = 0; i < 128; i++) {
        //     real[i] = 0.7 * Math.sin((i+1)/128 * 50 * Math.PI);
        //     imag[i] = Math.cos((i+1)/128 * 120 * Math.PI);
        // }

        var n = real.length;
        if (n != imag.length)
            throw "Mismatched lengths";
        if (n == 0)
            return;
        else if ((n & (n - 1)) == 0)  // Is power of 2
            this.transformRadix2(real, imag);
        else  // More complicated algorithm for arbitrary sizes
            this.transformBluestein(real, imag);
    }


    /* 
     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
     */
    inverseTransform(real, imag) {
        this.transform(imag, real);
    }


    /* 
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     */
    transformRadix2(real, imag) {
        // Length variables
        var n = real.length;
        if (n != imag.length)
            throw "Mismatched lengths";
        if (n == 1)  // Trivial transform
            return;
        var levels = -1;
        for (var i = 0; i < 32; i++) {
            if (1 << i == n)
                levels = i;  // Equal to log2(n)
        }
        if (levels == -1)
            throw "Length is not a power of 2";

        // Trigonometric tables
        var cosTable = new Array(n / 2);
        var sinTable = new Array(n / 2);
        for (var i = 0; i < n / 2; i++) {
            cosTable[i] = Math.cos(2 * Math.PI * i / n);
            sinTable[i] = Math.sin(2 * Math.PI * i / n);
        }

        // Bit-reversed addressing permutation
        for (var i = 0; i < n; i++) {
            var j = reverseBits(i, levels);
            if (j > i) {
                var temp = real[i];
                real[i] = real[j];
                real[j] = temp;
                temp = imag[i];
                imag[i] = imag[j];
                imag[j] = temp;
            }
        }

        // Cooley-Tukey decimation-in-time radix-2 FFT
        for (var size = 2; size <= n; size *= 2) {
            var halfsize = size / 2;
            var tablestep = n / size;
            for (var i = 0; i < n; i += size) {
                for (var j = i, k = 0; j < i + halfsize; j++ , k += tablestep) {
                    var l = j + halfsize;
                    var tpre = real[l] * cosTable[k] + imag[l] * sinTable[k];
                    var tpim = -real[l] * sinTable[k] + imag[l] * cosTable[k];
                    real[l] = real[j] - tpre;
                    imag[l] = imag[j] - tpim;
                    real[j] += tpre;
                    imag[j] += tpim;
                }
            }
        }

        // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
        function reverseBits(x, bits) {
            var y = 0;
            for (var i = 0; i < bits; i++) {
                y = (y << 1) | (x & 1);
                x >>>= 1;
            }
            return y;
        }

    }


    /* 
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This requires the convolution function, which in turn requires the radix-2 FFT function.
     * Uses Bluestein's chirp z-transform algorithm.
     */
    transformBluestein(real, imag) {
        // Find a power-of-2 convolution length m such that m >= n * 2 + 1
        var n = real.length;
        if (n != imag.length)
            throw "Mismatched lengths";
        var m = 1;
        while (m < n * 2 + 1)
            m *= 2;

        // Trignometric tables
        var cosTable = new Array(n);
        var sinTable = new Array(n);
        for (var i = 0; i < n; i++) {
            var j = i * i % (n * 2);  // This is more accurate than j = i * i
            cosTable[i] = Math.cos(Math.PI * j / n);
            sinTable[i] = Math.sin(Math.PI * j / n);
        }

        // Temporary vectors and preprocessing
        var areal = this.newArrayOfZeros(m);
        var aimag = this.newArrayOfZeros(m);
        for (var i = 0; i < n; i++) {
            areal[i] = real[i] * cosTable[i] + imag[i] * sinTable[i];
            aimag[i] = -real[i] * sinTable[i] + imag[i] * cosTable[i];
        }
        var breal = this.newArrayOfZeros(m);
        var bimag = this.newArrayOfZeros(m);
        breal[0] = cosTable[0];
        bimag[0] = sinTable[0];
        for (var i = 1; i < n; i++) {
            breal[i] = breal[m - i] = cosTable[i];
            bimag[i] = bimag[m - i] = sinTable[i];
        }

        // Convolution
        var creal = new Array(m);
        var cimag = new Array(m);
        this.convolveComplex(areal, aimag, breal, bimag, creal, cimag);

        // Postprocessing
        for (var i = 0; i < n; i++) {
            real[i] = creal[i] * cosTable[i] + cimag[i] * sinTable[i];
            imag[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i];
        }

    }


    /* 
     * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
     */
    convolveReal(x, y, out) {
        var n = x.length;
        if (n != y.length || n != out.length)
            throw "Mismatched lengths";
        this.convolveComplex(x, this.newArrayOfZeros(n), y, this.newArrayOfZeros(n), out, this.newArrayOfZeros(n));
    }


    /* 
     * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
     */
    convolveComplex(xreal, ximag, yreal, yimag, outreal, outimag) {
        var n = xreal.length;
        if (n != ximag.length || n != yreal.length || n != yimag.length
            || n != outreal.length || n != outimag.length)
            throw "Mismatched lengths";

        xreal = xreal.slice();
        ximag = ximag.slice();
        yreal = yreal.slice();
        yimag = yimag.slice();
        this.transform(xreal, ximag);
        this.transform(yreal, yimag);

        for (var i = 0; i < n; i++) {
            var temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
            ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
            xreal[i] = temp;
        }
        this.inverseTransform(xreal, ximag);

        for (var i = 0; i < n; i++) {  // Scaling (because this FFT implementation omits it)
            outreal[i] = xreal[i] / n;
            outimag[i] = ximag[i] / n;
        }
    }


    newArrayOfZeros(n) {
        var result = [];
        for (var i = 0; i < n; i++)
            result.push(0);
        return result;
    }
}