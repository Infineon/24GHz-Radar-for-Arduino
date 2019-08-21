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
 * @file presence_sensing.h
 *
 * @brief This file defines the API to perform presence sensing use case.
 *
 *
 */

#ifndef IFX_RADAR_PRESENCESENSING_H
#define IFX_RADAR_PRESENCESENSING_H

/*
==============================================================================
   1. INCLUDE FILES
==============================================================================
*/

#include "ifxRadarSDK.h"
/*
==============================================================================
   2. DEFINITIONS
==============================================================================
*/

/*
==============================================================================
   3. TYPES
==============================================================================
*/
/**
 *
 * @brief Forward declaration structure for presence sensing
 *
 */

typedef enum
{
    PRESENCE = 0U,
    ABSENCE  = 1U
} Presence_State_t;

typedef void (*state_status_cb_t)(Presence_State_t cur_state);
typedef void (*state_change_cb_t)(Presence_State_t new_state);

typedef struct
{
    ifx_FFT_Size_t range_fft_size;
    ifx_FFT_Size_t doppler_fft_size;
    ifx_Window_Type_t range_fft_window_type;
    ifx_Float_t range_fft_window_alpha;
    ifx_Window_Type_t doppler_fft_window_type;
    ifx_Float_t doppler_fft_window_alpha;
    ifx_Float_t mti_weight;
    ifx_Float_t minimum_detection_range_m;
    ifx_Float_t maximum_detection_range_m;
    uint32_t range_hysteresis_percentage;
    uint32_t presence_confirm_count;
    uint32_t absence_confirm_count;
    ifx_Device_Config_t device_config;
    state_status_cb_t state_status_cb;
    state_change_cb_t state_change_cb;
    ifx_Range_Spectrum_Mode_t range_spectrum_mode;
    ifx_Float_t threshold_factor_presence_peak;
    ifx_Float_t threshold_factor_absence_peak;
    ifx_Float_t threshold_factor_absence_fine_peak;
} ifx_PresenceSensing_Config_t;

/**
 * @brief This structure holds the metrics of the feature space used for presence detection.
 *
 * The presence detection algorithm analyzes the distance (range) and velocity (speed) of targets
 * in the field of view, so the time domain input data must be transformed to range/speed feature
 * space. Resolution and maximum values in this feature space depend on the time domain acquisition
 * parameters and the presence sensing algorithm calculates them from the device configuration. To
 * go the other way round and specify the metrics the function
 * @ref ifx_presencesensing_get_device_config can be used to derive those acquisition parameters
 * from desired feature space metrics. This structure is used to specify the desired metrics to
 * that function.
 */
typedef struct
{
    float range_resolution_m;   /**< The range resolution is the distance between two consecutive
                                     bins of the range transform. Note that even though zero
                                     padding before the range transform seems to increase this
                                     resolution, the true resolution does not change but depends
                                     only from the acquisition parameters. Zero padding is just
                                     interpolation! */
    float maximum_range_m;      /**< The bins of the range transform represent the range
                                     between 0m and this value. (If the time domain input data it
                                     is the range-maximum_range_m ... maximum_range_m.) */
    float speed_resolution_m_s; /**< The speed resolution is the distance between two consecutive
                                     bins of the Doppler transform. Note that even though zero
                                     padding before the speed transform seems to increase this
                                     resolution, the true resolution does not change but depends
                                     only from the acquisition parameters. Zero padding is just
                                     interpolation! */
    float maximum_speed_m_s;    /**< The bins of the Doppler transform represent the speed values
                                     between -maximum_speed_m_s and maximum_speed_m_s. */
} ifx_PresenceSensing_Metrics_t;

typedef struct ifx_PresenceSensing_Handle ifx_PresenceSensing_Handle_t;

/**
 * This structure is used the return intermediate results of the presence sensing algorithm.
 * The allocation and deallocation of this structure is up to the user by calling \ref ifx_presencesensing_create_result
 * and \ref ifx_presencesensing_destroy_result.
 */
typedef struct {
    Presence_State_t cur_presence_state; /**< Current presence state */
    ifx_Matrix_R_t range_doppler_map;    /**< Range Doppler Map, the number of valid rows of this matrix
                                              is defined by the num_targets element of this structure.
                                              Presence sensing module does not calculate a
                                              full range doppler map, therefore num_targets must be
                                              consiedered when reading this matrix.*/
    ifx_Matrix_C_t range_spectrogram;    /**< Range Spectrogram*/
    uint32_t num_targets;                /**<*Number of targets found in current run.*/
} ifx_PresenceSensing_Result_t;
/*
==============================================================================
   5. FUNCTION PROTOTYPES
==============================================================================
*/

ifx_Error_t ifx_presencesensing_create(const ifx_PresenceSensing_Config_t* config,
                                       ifx_PresenceSensing_Handle_t** handle);

ifx_Error_t ifx_presencesensing_destroy(ifx_PresenceSensing_Handle_t* handle);

ifx_Error_t ifx_presencesensing_run(const ifx_Matrix_R_t* frame_data,
                                    ifx_PresenceSensing_Handle_t* handle);

/**
 * Allocates memory for the result structure of the presence sensing module.
 * This function must be called after the creation of the presence sensing handle
 * and must be feed with the allocated and defined handle. It is up to the user to
 * destroy the allocated result instances. If called twice without destroying the
 * result instance the functions leads to memory leaks.
 * @param handle The presence sensing handle must be allocated and defined.
 * @param result Conatins important intermediate results see \ref ifx_PresenceSensing_Result_t.
 * @return error code \ref ifx_Error_t.
 */
ifx_Error_t ifx_presencesensing_create_result(ifx_PresenceSensing_Handle_t* handle,
                                              ifx_PresenceSensing_Result_t* result);

/**
 * Copies the intermediate results of the previous run into the result structure.
 * @param handle Handle to the presence sensing object.
 * @param result Pointer to \ref ifx_PresenceSensing_Result_t structure the result
 * will be stored in.
 * @return Error Code
 */
ifx_Error_t ifx_presencesensing_get_result(ifx_PresenceSensing_Handle_t* handle,
                                           ifx_PresenceSensing_Result_t* result);

/**
 * Frees allocated memory of the given result structure.
 * @param result Pointer to the \ref ifx_PresenceSensing_Result_t structure to free.
 * @return Error Code
 */
ifx_Error_t ifx_presencesensing_destroy_result(ifx_PresenceSensing_Result_t* result);

/**
 * @brief This function derives a device configuration from specified feature space metrics.
 *
 * This functions calculates FMCW frequency range, number of samples per chirp, number of chirps
 * per frame and chirp-to-chirp time needed to achieve the specified feature space metrics. Number
 * of samples per chirp and number of chirps per frame are rounded up to the next power of two,
 * because this is a usual constraint for range and Doppler transform. The resulting maximum range
 * and maximum speed may therefore be larger than specified.
 *
 * The calculated values are written to the members of the *device_config* struct, which must be
 * provided by the caller. Note that only those fields mentioned above are modified. Other fields
 * of the device_config are not related to the feature space metrics, so they stay unmodified. The
 * caller must take care for proper initialization of those fields before using the device_config
 * struct.
 *
 * There is no range checking of the provided parameters in this function. Invalid metrics will
 * result in invalid device configuration, which can't be applied, so the parameter range checking
 * is post poned to the place, where the device config is used.
 *
 * @param[in]  metrics        The desired feature space metrics to be converted.
 * @param[out] device_config  The struct where the parameters calculated from the metrics are
 *                            written to.
 */
void ifx_presencesensing_get_device_config(const ifx_PresenceSensing_Metrics_t* metrics,
                                           ifx_Device_Config_t* device_config);

#endif  // IFX_RADAR_PRESENCESENSING_H
