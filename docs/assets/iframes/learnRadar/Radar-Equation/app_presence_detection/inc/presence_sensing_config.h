/* ===========================================================================
** Copyright (C) 2018 Infineon Technologies AG. All rights reserved.
** ===========================================================================
**
** ===========================================================================
** Infineon Technologies AG (INFINEON) is supplying this file for use
** exclusively with Infineon's sensor products. This file can be freely
** distributed within development tools and software supporting such
** products.
**
** THIS SOFTWARE IS PROVIDED "AS IS".  NO WARRANTIES, WHETHER EXPRESS, IMPLIED
** OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
** MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE APPLY TO THIS SOFTWARE.
** INFINEON SHALL NOT, IN ANY CIRCUMSTANCES, BE LIABLE FOR DIRECT, INDIRECT,
** INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES, FOR ANY REASON
** WHATSOEVER.
** ===========================================================================
*/
/**
 * @file presence_sensing_config.h
 *
 * @brief This file defines the default config values for different parameters.
 * 
 * For more detailed information about the parameters please refer to 
 * \ref ssct_radarsdk_applications_presence_config the section on
 * Presence Sensing configuration parameters in the Presence Detection
 * page under Applications of Radar in the Radar SDK Documnentation 
 *
 *
 */


#ifndef INC_PRESENCE_SENSING_CONFIG_H_
#define INC_PRESENCE_SENSING_CONFIG_H_

#define IFX_RANGE_RESOLUTION_M          (0.150f)    /**< Range resolution translates into bandwidth(BW)=c/(2*Rres).
                                                         This bandwidth impacts the range captured by one range FFT bin.
                                                         The valid range of this parameter is [0.025 - 1.00] meter. */
                                                              
#define IFX_MAXIMUM_RANGE_M             (9.59f)     /**< Maximum range recommended to be at least 8 times the range resolution. 
                                                         Valid range [0.20 - 20] meter */
                                                              
#define IFX_SPEED_RESOLUTION_M_S        (0.08f)     /**< This paramter impacts the precision in speed.
                                                         Valid range [0.025 - 0.833]m/s */
                                                               
#define IFX_MAXIMUM_SPEED_M_S           (2.45f)     /**< This impacts chirp to chirp time parameter of chip.
                                                         Valid range [0.25 - 25]m/s */
                                                               
#define IFX_FRAME_RATE_HZ               (5)        /**< This is the frame acquisition rate for raw data.
                                                         valid range is [16 - 100]Hz */

#define IFX_BGT_TX_POWER                (31U)        /**< TX Power level to be used on the radar transceiver.
                                                         Valid range is [1 - 31] */
                                                         
#define IFX_RX_ANTENNA_NUMBER           (3)         /**< Presence sensing uses only single Rx antenna. The ID number of 
                                                         the RX antenna e.g. 1 => Rx1; 2 => Rx2; 3 => Rx3 */
                                                         
#define IFX_IF_GAIN_DB                  (33)        /**< This is the amplification factor that is
                                                         applied to the IF signal before sampling.
                                                         Valid range is [18 - 60]dB */


#define IFX_MTI_WEIGHT                  (1.0f)      /**< Higher the value, stronger the effect of static target removal with successive
                                                         frames. When value is 1.0 static targets are completely removed in the next consecutive
                                                         frame.
                                                         Valid range is [0.0 - 1.0] */
                                                         
#define IFX_MINIMUM_DETECTION_RANGE_M   (0.2f)       /**< Targets below this distance are not detected. Valid range [0.20 - 20] meter and
                                                         smaller than maximum detection range.*/

#define IFX_MAXIMUM_DETECTION_RANGE_M   (2.0f)      /**< Targets above this distance are not detected. This value cannot be greater than
                                                         maximum range. Valid range [0.20 - 20] meter */

#define IFX_RANGE_HYSTERESIS            (10U)       /**< Hysteresis for maximum detection range while changing state from presence to
                                                         absence and vice versa. Valid range in percentage value [0 - 100] */

#define IFX_ABSENCE_CONFIRM_COUNT       (4U)        /**< Number of consecutive absence detections in consecutive frames for making a definitive
                                                         absence detection. Valid range [1 - 10] */
                                                         
#define IFX_PRESENCE_CONFIRM_COUNT      (5U)        /**< Number of consecutive presence detections in consecutive frames for making a definitive
                                                         presence detection. Valid range [1 - 10] */
                                                         
#define IFX_RANGE_SPECTRUM_MODE         (3U)        /**< mode of calculation of range spectrum.
                                                         0 = SINGLE CHIRP MODE , 1 = COHERENT INTEGRATION MODE (DEFAULT), 2 = MAXIMUM ENERGY MODE
                                                         (see \ref ifx_Range_Spectrum_Mode_t) */

#define IFX_THRESHOLD_FACTOR_PRESENCE_PEAK          (3.0f)      /**< Decides threshold factor param in ifx_Peak_Search_Config_t for configuring the
                                                                     "presence_peak" peak search module that is active in the PRESENCE state [internal param] */

#define IFX_THRESHOLD_FACTOR_ABSENCE_PEAK           (4.0f)      /**< Decides threshold factor param in ifx_Peak_Search_Config_t for configuring the
                                                                     "absence_peak" peak search module that is active in the ABSENCE state [internal param] */

#define IFX_THRESHOLD_FACTOR_ABSENCE_FINE_PEAK      (1.5f)    /**< Decides threshold factor param in ifx_Peak_Search_Config_t for configuring the
                                                                     "absence_fine_peak" peak search module that is active in the ABSENCE state and decides the
                                                                     range bins on which the slow time FFT needs to be performed [internal param] */      


#endif /* INC_PRESENCE_SENSING_CONFIG_H_ */
