/* ===========================================================================
** Copyright (C) 2019 Infineon Technologies AG. All rights reserved.
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
 * @file presence_sensing.c
 *
 * @brief This file defines the API for presence sensing use case.
 *
 *
 */


/*
==============================================================================
   1. INCLUDE FILES
==============================================================================
*/

#include <string.h>
#include <stdlib.h>
#include "presence_sensing.h"

/*
==============================================================================
   2. LOCAL DEFINITIONS
==============================================================================
*/

#define ENABLE_MEAN_SUBTRACTION    1
#define MAX_NUM_OF_TARGETS         5
#define FMCW_CENTER_FREQUENCY_KHZ  60500000 // The center frequency of the chirp

/*
==============================================================================
   3. LOCAL TYPES
==============================================================================
*/

typedef struct
{   ifx_Vector_R_t fft_spectrum_result;
    ifx_Matrix_C_t frame_fft_half_result;
} ifx_RangeFFT_t;

typedef struct
{
    ifx_Float_t    doppler_threshold;

    ifx_Vector_C_t fft_data;
    ifx_Vector_C_t prepro_result;
    ifx_Vector_C_t chirp_fft_result;
    ifx_Vector_R_t abs_result;
    ifx_Matrix_R_t range_doppler_map;
} ifx_DopplerFFT_t;

struct ifx_PresenceSensing_Handle
{
    Presence_State_t  state;
    state_status_cb_t state_status_cb;
    state_change_cb_t state_change_cb;

    uint32_t cur_peak_count;
    uint32_t doppler_obj_count;
    uint32_t definitive_hello_count;
    uint32_t hello_counter;
    uint32_t definitive_bye_count;
    uint32_t bye_counter;
    uint32_t global_counter;

    ifx_Range_Spectrum_Handle_t range_spectrum_handle;
    ifx_RangeFFT_t             range_spectrum_data;
    ifx_DopplerFFT_t           doppler_data;
    ifx_Vector_R_t             mti_result;

    ifx_Float_t             doppler_window_scale;
    ifx_Vector_R_t          doppler_fft_window;
    ifx_FFT_Handle_t        doppler_fft_handle;

    ifx_Peak_Search_Handle_t presence_peak_handle;
    ifx_Peak_Search_Handle_t absence_peak_handle;
    ifx_Peak_Search_Handle_t absence_fine_peak_handle;
    ifx_Peak_Search_Handle_t peak_search_handle;
    uint32_t                num_targets;

    ifx_MTI_Handle_t        mti_handle;
};

/*
==============================================================================
   4. DATA
==============================================================================
*/


/*
==============================================================================
   5. LOCAL FUNCTION PROTOTYPES
==============================================================================
*/

static ifx_Float_t create_scale(const ifx_Vector_R_t* win);

static void reset_data(ifx_PresenceSensing_Handle_t* handle);

static void fft_shift(ifx_Vector_C_t* vector);

static void state_machine(ifx_PresenceSensing_Handle_t* handle);

/*
==============================================================================
  6. LOCAL FUNCTIONS
==============================================================================
*/

ifx_Float_t create_scale(const ifx_Vector_R_t* win)
{
    ifx_Float_t fnorm = 0;

    for (uint32_t i = 0; i < win->length; ++i)
    {
        fnorm += win->data[i];
    }

    if (fnorm != 0)
    {
        fnorm = 1.0 / fnorm;
    }
    else
    {
        fnorm = 1.0;
    }

    return fnorm;
}

void reset_data(ifx_PresenceSensing_Handle_t* handle)
{
    memset(handle->range_spectrum_data.frame_fft_half_result.data, 0,
           sizeof(ifx_Complex_t) *
           handle->range_spectrum_data.frame_fft_half_result.rows*
           handle->range_spectrum_data.frame_fft_half_result.columns);
    // doppler data
    handle->doppler_obj_count = 0;
}

void fft_shift(ifx_Vector_C_t* vector)
{
    ifx_Complex_t temp = 0;
    uint32_t idx = vector->length / 2;

    for (uint32_t i = 0; i < vector->length / 2; ++i, ++idx)
    {
        temp = vector->data[i];
        vector->data[i] = vector->data[idx];
        vector->data[idx] = temp;
    }
}

void state_machine(ifx_PresenceSensing_Handle_t* handle)
{
    if (handle->state == PRESENCE)
    {
        if (handle->cur_peak_count == 0)
        {
            ++handle->bye_counter;
        }

        if ( handle->bye_counter == handle->definitive_bye_count &&
             handle->global_counter == handle->definitive_bye_count )
        {
            handle->state = ABSENCE;

            if (handle->state_change_cb != NULL)
            {
                handle->state_change_cb(handle->state);
            }

            handle->peak_search_handle = handle->absence_peak_handle;
        }
    }
    else //if(handle->state == ABSENCE)
    {
        if ( handle->cur_peak_count > 0 || handle->doppler_obj_count > 0)
        {
            ++handle->hello_counter;
        }
        else
        {
            handle->hello_counter = 0;
        }

        if (handle->hello_counter == handle->definitive_hello_count)
        {
            handle->state = PRESENCE;

            if (handle->state_change_cb != NULL)
            {
                handle->state_change_cb(handle->state);
            }

            handle->peak_search_handle = handle->presence_peak_handle;
        }
    }

    if (handle->global_counter == handle->definitive_bye_count)
    {
        handle->bye_counter = 0;
        handle->global_counter = 0;
    }
}

/*
==============================================================================
   7. EXPORTED FUNCTIONS
==============================================================================
*/

ifx_Error_t ifx_presencesensing_create(const ifx_PresenceSensing_Config_t* config,
                                       ifx_PresenceSensing_Handle_t** handle)
{
    ifx_Error_t ret = 0;
    ifx_PresenceSensing_Handle_t* h = NULL;
    h = calloc(1, sizeof(ifx_PresenceSensing_Handle_t));

    if (h == NULL)
    {
        return IFX_ERROR_MEMORY_ALLOCATION_FAILED;
    }

    h->state = ABSENCE;
    h->state_status_cb = config->state_status_cb;
    h->state_change_cb = config->state_change_cb;

    h->definitive_hello_count =  config->presence_confirm_count;
    h->hello_counter = 0;
    h->definitive_bye_count =  config->absence_confirm_count;
    h->bye_counter = 0;
    h->global_counter = 0;

    h->doppler_obj_count = 0;

    /***************************** Range Windowing **************************/

    ifx_Range_Spectrum_Config_t range_spectrum_config =
    {
            .fft_config =
            {
                    .fft_input_len = config->device_config.num_samples_per_chirp,
                    .fft_type = FFT_TYPE_R2C,
                    .fft_size = config->range_fft_size,
                    .mean_removal_flag = 1,
                    .input_sampling_freq_khz = (config->device_config.adc_samplerate_hz) / 1000,
                    .window_config =
                     {
                          .type = config->range_fft_window_type,
                          .size = config->device_config.num_samples_per_chirp,
                          .at_dB = config->range_fft_window_alpha
                     },
                    .is_normalized_window =1
            },
            .num_of_chirps_per_frame = config->device_config.num_chirps_per_frame,
            .output_scale_type = SCALE_TYPE_LINEAR,
            .chirp_bandwidth_khz = (config->device_config.upper_frequency_kHz -
                                    config->device_config.lower_frequency_kHz),
            .spect_threshold = 0
    };

    ret = ifx_range_spectrum_create(&range_spectrum_config,
                                    &h->range_spectrum_handle);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_range_spectrum_set_mode(h->range_spectrum_handle, config->range_spectrum_mode);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_vector_create(&h->range_spectrum_data.fft_spectrum_result, config->range_fft_size);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_matrix_create(&h->range_spectrum_data.frame_fft_half_result,
                            config->device_config.num_chirps_per_frame,
                            config->range_fft_size / 2);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_vector_create(&h->mti_result, config->range_fft_size / 2);
    IFX_ERR_CHECK_RETURN(ret);
    /***************************** Doppler Windowing **************************/

    ifx_Window_Config_t doppler_fft_window_config;;
    doppler_fft_window_config.type = config->doppler_fft_window_type;
    doppler_fft_window_config.size = config->device_config.num_chirps_per_frame;
    doppler_fft_window_config.at_dB = config->doppler_fft_window_alpha;

    ret = ifx_vector_create(&h->doppler_fft_window, doppler_fft_window_config.size);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_window_init(&doppler_fft_window_config, &h->doppler_fft_window);
    IFX_ERR_CHECK_RETURN(ret);

    h->doppler_window_scale = create_scale(&h->doppler_fft_window);

    /***************************** Doppler FFT ************************************/

    ret = ifx_vector_create(&h->doppler_data.fft_data, config->device_config.num_chirps_per_frame);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_fft_create(FFT_TYPE_C2C, config->device_config.num_chirps_per_frame, config->doppler_fft_size, &h->doppler_fft_handle);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_vector_create(&h->doppler_data.prepro_result,  config->device_config.num_chirps_per_frame);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_vector_create(&h->doppler_data.chirp_fft_result, config->doppler_fft_size);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_vector_create(&h->doppler_data.abs_result, config->doppler_fft_size);
    IFX_ERR_CHECK_RETURN(ret);

    /********************************* Algorithm parameters **************************/

    h->doppler_data.doppler_threshold = 0.0002;

    ifx_Float_t value_per_bin = (ifx_Float_t)(300000.0f /
                                ((config->device_config.upper_frequency_kHz - config->device_config.lower_frequency_kHz) * 2 *
                                 (config->range_fft_size / config->device_config.num_samples_per_chirp)));

    ifx_Float_t active_zone_m = config->maximum_detection_range_m;
    ifx_Float_t min_range_m = config->minimum_detection_range_m;

    ifx_Float_t hysteresis_m = active_zone_m * config->range_hysteresis_percentage / 100.0;

    // peak search handle
    ifx_Peak_Search_Config_t presence_peak_search_config = {.value_per_bin = value_per_bin,
                                                            .search_zone_start = min_range_m,
                                                            .search_zone_end = active_zone_m + hysteresis_m,
                                                            .threshold_factor = config->threshold_factor_presence_peak,
                                                            .threshold_offset = 0,
                                                            .max_num_peaks = 1};
    ret = ifx_peak_search_create(&presence_peak_search_config,
                                &h->presence_peak_handle);
    IFX_ERR_CHECK_RETURN(ret);

    ifx_Peak_Search_Config_t absence_peak_search_config = {.value_per_bin = value_per_bin,
                                                           .search_zone_start = min_range_m,
                                                           .search_zone_end = active_zone_m - hysteresis_m,
                                                           .threshold_factor = config->threshold_factor_absence_peak,
                                                           .threshold_offset = 0,
                                                           .max_num_peaks = MAX_NUM_OF_TARGETS};
    ret = ifx_peak_search_create(&absence_peak_search_config,
                                &h->absence_peak_handle);
    IFX_ERR_CHECK_RETURN(ret);

    ifx_Peak_Search_Config_t absence_fine_peak_search_config = {.value_per_bin = value_per_bin,
                                                               .search_zone_start = min_range_m,
                                                               .search_zone_end = active_zone_m,
                                                               .threshold_factor = config->threshold_factor_absence_fine_peak,
                                                               .threshold_offset = 0,
                                                                .max_num_peaks = MAX_NUM_OF_TARGETS};
    ret = ifx_peak_search_create(&absence_fine_peak_search_config,
                                &h->absence_fine_peak_handle);
    IFX_ERR_CHECK_RETURN(ret);



    h->peak_search_handle = h->absence_peak_handle;

    ret = ifx_mti_create(config->mti_weight, h->range_spectrum_data.fft_spectrum_result.length / 2, &h->mti_handle);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_vector_create(&h->mti_result,h->range_spectrum_data.fft_spectrum_result.length / 2);
    IFX_ERR_CHECK_RETURN(ret);

    *handle = h;
    return ret;
}

ifx_Error_t ifx_presencesensing_destroy(ifx_PresenceSensing_Handle_t* handle)
{
    ifx_Error_t ret = 0;

    ret = ifx_vector_destroy(&handle->range_spectrum_data.fft_spectrum_result);
    IFX_ERR_CHECK(ret);

    ret = ifx_matrix_destroy(&handle->range_spectrum_data.frame_fft_half_result);
    IFX_ERR_CHECK(ret);

    // doppler data
    ret = ifx_vector_destroy(&handle->doppler_fft_window);
    IFX_ERR_CHECK(ret);

    ret = ifx_vector_destroy(&handle->doppler_data.fft_data);
    IFX_ERR_CHECK(ret);

    ret = ifx_fft_destroy(handle->doppler_fft_handle);
    IFX_ERR_CHECK(ret);

    ret = ifx_vector_destroy(&handle->doppler_data.prepro_result);
    IFX_ERR_CHECK(ret);

    ret = ifx_vector_destroy(&handle->doppler_data.chirp_fft_result);
    IFX_ERR_CHECK(ret);

    ret = ifx_vector_destroy(&handle->doppler_data.abs_result);
    IFX_ERR_CHECK(ret);

    // peak search handle
    ret = ifx_peak_search_destroy(handle->presence_peak_handle);
    IFX_ERR_CHECK(ret);

    ret = ifx_peak_search_destroy(handle->absence_peak_handle);
    IFX_ERR_CHECK(ret);

    ret = ifx_peak_search_destroy(handle->absence_fine_peak_handle);
    IFX_ERR_CHECK(ret);

    handle->peak_search_handle = NULL;

    ret = ifx_mti_destroy(handle->mti_handle);
    IFX_ERR_CHECK(ret);

    ret = ifx_vector_destroy(&handle->mti_result);
    IFX_ERR_CHECK(ret);

    free(handle);

    return ret;
}

ifx_Error_t ifx_presencesensing_run(const ifx_Matrix_R_t* frame_data,
                                    ifx_PresenceSensing_Handle_t* handle)
{
    ifx_Error_t ret = 0;

    if (handle == NULL || frame_data == NULL)
    {
        return IFX_ERROR_ARGUMENT_NULL;
    }

    reset_data(handle);

    ++handle->global_counter;
    /*************************************************************************************/
    /*********************************** Range Processing ********************************/
    /*************************************************************************************/

    ret = ifx_range_spectrum_run_r(handle->range_spectrum_handle, frame_data,
                                   &handle->range_spectrum_data.fft_spectrum_result);
    IFX_ERR_CHECK_RUNTIME(ret);

    ret = ifx_range_spectrum_get_fft_transformed_matrix(handle->range_spectrum_handle,
                                                        &handle->range_spectrum_data.frame_fft_half_result);
    IFX_ERR_CHECK_RUNTIME(ret);

    /**************************** Remove static object (MTI filter) ***********************/
    ifx_vector_copy(&handle->range_spectrum_data.fft_spectrum_result, 0,
                    handle->range_spectrum_data.fft_spectrum_result.length / 2,
                    &handle->mti_result);
    ret = ifx_mti_run (handle->mti_handle, &handle->mti_result);
    IFX_ERR_CHECK_RUNTIME(ret);

    ifx_Peak_Search_Result_t cur_peak_search_result = {0};
    ret = ifx_peak_search_run(handle->peak_search_handle,
                             &handle->mti_result,
                             &cur_peak_search_result);
    IFX_ERR_CHECK_RUNTIME(ret);

    handle->cur_peak_count = cur_peak_search_result.peak_count;

    /*************************************************************************************/
    /********************************** Doppler Processing *******************************/
    /*************************************************************************************/

    // absence_fine_peak_search
    ifx_Peak_Search_Result_t fine_peak_result = {0};
    ret = ifx_peak_search_run(handle->absence_fine_peak_handle,
                             &handle->mti_result,
                             &fine_peak_result);
    IFX_ERR_CHECK_RUNTIME(ret);
    handle->num_targets = fine_peak_result.peak_count;
    // doppler fft
    for (uint32_t i = 0; i < fine_peak_result.peak_count; ++i)
    {
        uint32_t pidx = fine_peak_result.index[i];

        for (uint32_t midx = 0; midx < handle->range_spectrum_data.frame_fft_half_result.rows; ++midx)
        {
            ifx_Complex_t element;
            ifx_matrix_get_element_c(&handle->range_spectrum_data.frame_fft_half_result, midx, pidx, &element);

            handle->doppler_data.fft_data.data[midx] = element;
        }

        /******************************* Doppler Preprocessing Start ***********************/

        // 1. Mean removal
        ifx_Complex_t mean = 0;
        ifx_math_get_mean_c(&handle->doppler_data.fft_data, &mean);

        ret = ifx_math_subtract_scalar_c(&handle->doppler_data.fft_data, mean, &handle->doppler_data.prepro_result);
        IFX_ERR_CHECK_RUNTIME(ret);

        // 2. multiply scale
        // 3. multiply window
        for (uint32_t i = 0; i < handle->doppler_data.fft_data.length; ++i)
        {
            handle->doppler_data.prepro_result.data[i] *= (handle->doppler_window_scale * handle->doppler_fft_window.data[i]); // Complex = Complex * (Real * Real)
        }

        /******************************* Doppler Preprocessing End ***********************/

        // 2. doppler fft
        ret = ifx_fft_run_c(handle->doppler_fft_handle, &handle->doppler_data.prepro_result, &handle->doppler_data.chirp_fft_result);
        IFX_ERR_CHECK_RUNTIME(ret);

        fft_shift(&handle->doppler_data.chirp_fft_result);

        ret = ifx_math_vector_abs_c(&handle->doppler_data.chirp_fft_result, &handle->doppler_data.abs_result);
        IFX_ERR_CHECK_RUNTIME(ret);

        //copy range doppler map vectors only if requested by user by allocation memory for result vector
        if(handle->doppler_data.range_doppler_map.columns != 0) {
            ret = ifx_matrix_set_row_vector_r(&handle->doppler_data.range_doppler_map, i, &handle->doppler_data.abs_result);
            IFX_ERR_CHECK_RUNTIME(ret);
        }

        uint32_t max_idx = 0;
        ifx_Float_t max_val = 0.0;
        ret = ifx_math_find_max(&handle->doppler_data.abs_result, &max_idx, &max_val);
        IFX_ERR_CHECK_RUNTIME(ret);

        if (max_val > handle->doppler_data.doppler_threshold && max_idx < (handle->doppler_data.abs_result.length) / 2)
        {
            ++handle->doppler_obj_count;
        }
    }
    // state machine
    state_machine(handle);

    if (handle->state_status_cb != NULL)
    {
        handle->state_status_cb(handle->state);
    }
    return ret;
}

ifx_Error_t ifx_presencesensing_get_result(ifx_PresenceSensing_Handle_t* handle,
                                           ifx_PresenceSensing_Result_t* result)
{
    ifx_Error_t ret = IFX_OK;

    ifx_matrix_clone_c(&handle->range_spectrum_data.frame_fft_half_result, &result->range_spectrogram);
    IFX_ERR_CHECK_RETURN(ret);

    ifx_matrix_clone_r(&handle->doppler_data.range_doppler_map, &result->range_doppler_map);
    IFX_ERR_CHECK_RETURN(ret);

    result->cur_presence_state = handle->state;
    result->num_targets = handle->num_targets;
    return ret;
}


ifx_Error_t ifx_presencesensing_create_result(ifx_PresenceSensing_Handle_t* handle,
                                              ifx_PresenceSensing_Result_t* result)
{
    ifx_Error_t ret = IFX_OK;

    ret = ifx_matrix_create_c(&result->range_spectrogram,
                              handle->range_spectrum_data.frame_fft_half_result.rows,
                              handle->range_spectrum_data.frame_fft_half_result.columns);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_matrix_create_r(&result->range_doppler_map,
                              MAX_NUM_OF_TARGETS,
                              handle->doppler_data.abs_result.length);
    IFX_ERR_CHECK_RETURN(ret);

    if(handle->doppler_data.range_doppler_map.columns != 0)
        return ret;

    ret = ifx_matrix_create_r(&handle->doppler_data.range_doppler_map,
                              MAX_NUM_OF_TARGETS,
                              handle->doppler_data.abs_result.length);
    return ret;
}

ifx_Error_t ifx_presencesensing_destroy_result(ifx_PresenceSensing_Result_t* result)
{
    ifx_Error_t ret = ifx_matrix_destroy_c(&result->range_spectrogram);
    IFX_ERR_CHECK_RUNTIME(ret);

    ret = ifx_matrix_destroy_r(&result->range_doppler_map);
    IFX_ERR_CHECK_RUNTIME(ret);

    result->cur_presence_state = ABSENCE;
    result->num_targets = 0;

    return ret;
}

void ifx_presencesensing_get_device_config(const ifx_PresenceSensing_Metrics_t* metrics,
                                           ifx_Device_Config_t* device_config)
{
    const double c0 = 2.99792458e8;       // Speed of light in m/s

    /*
     * The range transform is an FFT. Here it is assumed that no zero padding is applied, because
     * zero is just interpolation and does not increase the true resolution.
     *
     * FMCW maps distance to a frequency in time domain data. During a chirp the RF travels from the
     * sensor to the target and back. With the distance r between sensor and target the signal travel
     * time is t = 2r / c0. During the time t the RF frequency has increased by f = t * BW/T, where
     * BW is the full bandwidth of the chirp and T is the chirp time. Putting this together distance
     * is mapped to frequency according to this formula: r = c0 * T * f / (2 * BW).
     *
     * With N samples acquired at f_sr, the frequency resolution per bin is df = f_sr / N, so the
     * range resolution results in dr = c0 * T * f_sr / (2 * N * BW).
     *
     * Ideally the chirp time is equal to the total ADC sampling duration T=N/f_sr and the resolution
     * formula collapses to dr = c0 / (2 * BW). This formula is used here. With a real sensor the
     * relationship T = N/f_sr may not be correct, because due to settling processes at the beginning
     * of the chirp the ADC is enabled with some delay after the ramp start.
     */
    double bandwidth_khz = 0.001 * c0 / (2 * metrics->range_resolution_m);
    device_config->lower_frequency_kHz = FMCW_CENTER_FREQUENCY_KHZ - (uint32_t)(bandwidth_khz * 0.5 + 0.5);
    device_config->upper_frequency_kHz = FMCW_CENTER_FREQUENCY_KHZ + (uint32_t)(bandwidth_khz * 0.5 + 0.5);

    /*
     * The number of bins multiplied with the range resolution results in the total range. Due to
     * Nyquist theorem only half of the spectrum is evaluated in range transform so the total range
     * is reduced by a factor of 2.
     *
     * Range transform is an FFT, and usually FFT sizes are powers of 2. If number of samples is
     * not a power of two, the FFT input could be zero padded. Anyway here the number of samples
     * is rounded to the next power of two increasing the total range. The trick to calculate this
     * rounding was found here: https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2.
     */
    device_config->num_samples_per_chirp = 2 * metrics->maximum_range_m / metrics->range_resolution_m;

    device_config->num_samples_per_chirp--;
    device_config->num_samples_per_chirp |= device_config->num_samples_per_chirp >> 1;
    device_config->num_samples_per_chirp |= device_config->num_samples_per_chirp >> 2;
    device_config->num_samples_per_chirp |= device_config->num_samples_per_chirp >> 4;
    device_config->num_samples_per_chirp |= device_config->num_samples_per_chirp >> 8;
    device_config->num_samples_per_chirp |= device_config->num_samples_per_chirp >> 16;
    device_config->num_samples_per_chirp++;

    /*
     * This formula was provided by algorithm team. Detailed information about this may be found
     * in some papers. At this point there is no documentation because the implementor of this
     * function does not know those papers. Sorry.
     */
    const double lambda = c0 / (1000.f * FMCW_CENTER_FREQUENCY_KHZ);
    device_config->chirp_to_chirp_time_100ps = 1.0e10 * lambda / (4 * metrics->maximum_speed_m_s);

    /*
     * The number of bins multiplied with the speed resolution results in the maximum speed. The
     * bins of the Doppler transforms represent the -v_max...v_max, that's why the maximum speed
     * is divided by 2.
     *
     * Doppler transform is an FFT, and usually FFT sizes are powers of 2. If number of samples is
     * not a power of two, the FFT input could be zero padded. Anyway here the number of samples
     * is rounded to the next power of two increasing the total range. The trick to calculate this
     * rounding was found here: https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2.
     */
    device_config->num_chirps_per_frame = 2 * metrics->maximum_speed_m_s / metrics->speed_resolution_m_s;

    device_config->num_chirps_per_frame--;
    device_config->num_chirps_per_frame |= device_config->num_chirps_per_frame >> 1;
    device_config->num_chirps_per_frame |= device_config->num_chirps_per_frame >> 2;
    device_config->num_chirps_per_frame |= device_config->num_chirps_per_frame >> 4;
    device_config->num_chirps_per_frame |= device_config->num_chirps_per_frame >> 8;
    device_config->num_chirps_per_frame |= device_config->num_chirps_per_frame >> 16;
    device_config->num_chirps_per_frame++;
}
