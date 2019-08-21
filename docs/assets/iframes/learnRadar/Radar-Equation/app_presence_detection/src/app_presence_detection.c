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

#define _GNU_SOURCE
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <limits.h>
#include <unistd.h>
#include <time.h>
#include <pthread.h>
#include <signal.h>
#include <stdbool.h>
#include <sys/stat.h>
#include <libgen.h>

#include "mjson.h"
#include "time_formatter.h"
#include "presence_sensing.h"
#include "presence_sensing_config.h"

/*
==============================================================================
   2. LOCAL DEFINITIONS
==============================================================================
*/

//These are some of the hardcoded values for the ifx_PresenceSensing_Config_t to be used in this application

#define IFX_ADC_SAMPLERATE_HZ           (1000000U)  /**< Samplerate of the ADC in Hz ==> [100k - 2M]
                                                        @todo : the app needs to be tested with other possible sample rates as well,
                                                        e.g., for higher bandwidths*/

#define IFX_RANGE_FFT_WINDOW_TYPE       (2U)        /**< Windowing Function applied on range fft input data. See @ref ifx_Window_Type_t. */
#define IFX_RANGE_FFT_WINDOW_AT_DB      (0.0f)      /**< Attenuation in dB, this parameter is only needed if windowing type is chebyshev */
#define IFX_DOPPLER_FFT_WINDOW_TYPE     (3U)        /**< Windowing Function applied on doppler fft input data. See @ref ifx_Window_Type_t. */
#define IFX_DOPPLER_FFT_WINDOW_AT_DB    (60.0f)     /**< Attenuation in dB, this parameter is only needed if windowing type is chebyshev */

#ifndef IFX_RANGE_SPECTRUM_MODE
#define IFX_RANGE_SPECTRUM_MODE         (1U)        /**< mode of calculation of range spectrum.
                                                         0 = SINGLE CHIRP MODE , 1 = COHERENT INTEGRATION MODE (DEFAULT), 2 = MAXIMUM ENERGY MODE
                                                         (see \ref ifx_Range_Spectrum_Mode_t) */
#endif

#ifndef IFX_THRESHOLD_FACTOR_PRESENCE_PEAK
#define IFX_THRESHOLD_FACTOR_PRESENCE_PEAK          (2.5f)      /**< Decides threshold factor param in ifx_Peak_Search_Config_t for configuring the
                                                                     "presence_peak" peak search module that is active in the PRESENCE state [internal param] */
#endif 

#ifndef IFX_THRESHOLD_FACTOR_ABSENCE_PEAK
#define IFX_THRESHOLD_FACTOR_ABSENCE_PEAK           (3.0f)      /**< Decides threshold factor param in ifx_Peak_Search_Config_t for configuring the
                                                                     "absence_peak" peak search module that is active in the ABSENCE state [internal param] */
#endif

#ifndef IFX_THRESHOLD_FACTOR_ABSENCE_FINE_PEAK
#define IFX_THRESHOLD_FACTOR_ABSENCE_FINE_PEAK      (1.2f)      /**< Decides threshold factor param in ifx_Peak_Search_Config_t for configuring the
                                                                     "absence_fine_peak" peak search module that is active in the ABSENCE state and decides the
                                                                     range bins on which the slow time FFT needs to be performed [internal param] */      
#endif                                                                                                                            

/*
==============================================================================
   3. LOCAL TYPES
==============================================================================
*/

typedef struct
{
    char *config_file_path;
    char *data_file_path;
    char *record_file_path;
} CmdLineOptions_t;

/*
==============================================================================
   4. DATA
==============================================================================
*/
ifx_Time_Handle_t* g_time_handle = NULL;
ifx_Device_Handle_t g_device_handle = NULL;
bool g_is_running = true;
const char usage_str[] = {
        "usage: app_presence_detection [-d <path>] [-c <path>] [-r <path>] [-h]\n\
        \t-d: data file path\n\
        \t-c: config file path\n\
        \t-r: record file path\n\
        \t-h: help message\n"
};

char abs_conf_path[PATH_MAX];

/*
==============================================================================
   5. LOCAL FUNCTION PROTOTYPES
==============================================================================
*/

/*
==============================================================================
  6. LOCAL FUNCTIONS
==============================================================================
*/

#ifdef _WIN32
    #include <windows.h>

    void sendCommand(char *s)
    {
        int i = mciSendString(s, NULL, 0, 0);
        if(i)
        {
            fprintf(stderr,"Error %d when sending %s\n", i, s);
        }
    }

    static void* play_hello(void * h)
    {
        chdir(abs_conf_path);
        sendCommand("Close All");
        sendCommand("Open Hello_fast.wav Type MPEGVideo Alias theMP3");
        sendCommand("Play theMP3 Wait");
        return NULL;
    }

    static void* play_goodbye(void* h)
    {
        chdir(abs_conf_path);
        sendCommand("Close All");
        sendCommand("Open Goodbye_fast.wav Type MPEGVideo Alias theMP3");
        sendCommand("Play theMP3 Wait");
        return NULL;
    }
#else // Raspberry Pi
    // #include <wiringPi.h>

    // #define LED_PIN 25 //0

    static void* play_hello(void * h)
    {
        chdir(abs_conf_path);
        system("aplay -q Hello_fast.wav &");
        // digitalWrite(LED_PIN, 0);
        return NULL;
    }

    static void* play_goodbye(void* h)
    {
        chdir(abs_conf_path);
        system("aplay -q Goodbye_fast.wav &");
        // digitalWrite(LED_PIN, 1);
        return NULL;
    }
#endif

/**
 * @brief Get the absolute path for configuration files,
 *        especially the wav files for playing.
 *
 * @param argv Arguments from main function.
 */
static void get_abs_conf_path(char **argv)
{
    char path_save[PATH_MAX];
    char abs_exe_path[PATH_MAX];
    char *p;

    getcwd(path_save, sizeof(path_save));
#ifdef _WIN32
    if(!(p = strrchr(argv[0], '\\')))
#else
    if(!(p = strrchr(argv[0], '/')))
#endif
    {
        getcwd(abs_exe_path, sizeof(abs_exe_path));
    }
    else
    {
        *p = '\0';
        chdir(argv[0]);
        getcwd(abs_exe_path, sizeof(abs_exe_path));
    }

    chdir("..");
    chdir("conf");
    getcwd(abs_conf_path, sizeof(abs_conf_path));

    chdir(path_save);
}

/**
 * @brief Callback function to print out the current status (Presence/Absence).
 *        Every frame result(Presence: '*' or Absence: '_') will come here.
 *
 * @param cur_state Current status
 */
static void state_status_callback(Presence_State_t cur_state)
{
    static int count = 1;
    printf("%s: ", ifx_time_get_cstr(g_time_handle));
    if(cur_state == PRESENCE)
    {
        printf("%d  *\n", count);
    }
    else //if(cur_state == ABSENCE)
    {
        printf("%d  _\n", count);
    }
    count++;
}

/**
 * @brief Callback function to play a media when status changes.
 *
 * @param new_state The new state.
 */
static void state_change_callback(Presence_State_t new_state)
{
    pthread_t pid;

    if(new_state == PRESENCE)
    {
        pthread_create(&pid, NULL, play_hello, NULL);
    }
    else //if(new_state == ABSENCE)
    {
        pthread_create(&pid, NULL, play_goodbye, NULL);
    }
}

/**
 * @brief Create DeviceConfig and PresenceSensing_Config object
 *        from JSON file.
 *
 * @param json_file
 * @param ps_config
 * @return ifx_Error_t
 */
static ifx_Error_t get_config(const char* json_file,
                              ifx_PresenceSensing_Config_t* ps_config)
{
    FILE *fp;
    struct stat filestatus;
    char* js;

    if(json_file == NULL)
    {
        //define empty json string for default configuration;
        js = (char*)malloc(3);
        strcpy(js, "{}");
    }
    else
    {
        if ( stat(json_file, &filestatus) != 0) {
            fprintf(stderr, "File %s not found\n", json_file);
            return IFX_ERROR;
        }
        js = (char*)malloc(filestatus.st_size);
        if ( js == NULL) {
            fprintf(stderr, "Memory error: unable to allocate %ld bytes\n", filestatus.st_size);
            return IFX_ERROR;
        }

        fp = fopen(json_file, "r");
        if (fp == NULL) {
            fprintf(stderr, "Unable to open %s\n", json_file);
            fclose(fp);
            free(js);
            return IFX_ERROR;
        }

        fread(js, filestatus.st_size, 1, fp);
        fclose(fp);
    }

    ifx_PresenceSensing_Metrics_t metrics;
    metrics.range_resolution_m = mjson_find_number(js, strlen(js), "$.IFX_RANGE_RESOLUTION_M", IFX_RANGE_RESOLUTION_M);
    metrics.maximum_range_m = mjson_find_number(js, strlen(js), "$.IFX_MAXIMUM_RANGE_M", IFX_MAXIMUM_RANGE_M);
    metrics.speed_resolution_m_s = mjson_find_number(js, strlen(js), "$.IFX_SPEED_RESOLUTION_M_S", IFX_SPEED_RESOLUTION_M_S);
    metrics.maximum_speed_m_s = mjson_find_number(js, strlen(js), "$.IFX_MAXIMUM_SPEED_M_S", IFX_MAXIMUM_SPEED_M_S);
    ifx_presencesensing_get_device_config(&metrics, &ps_config->device_config);

    ifx_Float_t frame_rate = mjson_find_number(js, strlen(js), "$.IFX_FRAME_RATE_HZ", IFX_FRAME_RATE_HZ);
    ps_config->device_config.frame_period_us = 1.0e6 / frame_rate;
    ps_config->device_config.adc_samplerate_hz = mjson_find_number(js, strlen(js), "$.IFX_ADC_SAMPLERATE_HZ", IFX_ADC_SAMPLERATE_HZ);
    ps_config->device_config.bgt_tx_power = mjson_find_number(js, strlen(js), "$.IFX_BGT_TX_POWER", IFX_BGT_TX_POWER);
    uint8_t  rx_antenna_number = mjson_find_number(js, strlen(js), "$.IFX_RX_ANTENNA_NUMBER", IFX_RX_ANTENNA_NUMBER);
    ps_config->device_config.rx_antenna_mask = (0x01 << (rx_antenna_number - 1));
    ps_config->device_config.if_gain_dB = mjson_find_number(js, strlen(js), "$.IFX_IF_GAIN_DB", IFX_IF_GAIN_DB);

    ps_config->range_fft_size = ps_config->device_config.num_samples_per_chirp;
    ps_config->doppler_fft_size = ps_config->device_config.num_chirps_per_frame * 2;
    ps_config->range_fft_window_type = IFX_RANGE_FFT_WINDOW_TYPE;
    ps_config->range_fft_window_alpha = IFX_RANGE_FFT_WINDOW_AT_DB;
    ps_config->doppler_fft_window_type = IFX_DOPPLER_FFT_WINDOW_TYPE;
    ps_config->doppler_fft_window_alpha = IFX_DOPPLER_FFT_WINDOW_AT_DB;
    ps_config->mti_weight = mjson_find_number(js, strlen(js), "$.IFX_MTI_WEIGHT", IFX_MTI_WEIGHT);
    ps_config->minimum_detection_range_m = mjson_find_number(js, strlen(js), "$.IFX_MINIMUM_DETECTION_RANGE_M", IFX_MINIMUM_DETECTION_RANGE_M);
    ps_config->maximum_detection_range_m = mjson_find_number(js, strlen(js), "$.IFX_MAXIMUM_DETECTION_RANGE_M", IFX_MAXIMUM_DETECTION_RANGE_M);
    ps_config->range_hysteresis_percentage =  mjson_find_number(js, strlen(js), "$.IFX_RANGE_HYSTERESIS", IFX_RANGE_HYSTERESIS);
    ps_config->absence_confirm_count = mjson_find_number(js, strlen(js), "$.IFX_ABSENCE_CONFIRM_COUNT", IFX_ABSENCE_CONFIRM_COUNT);
    ps_config->presence_confirm_count = mjson_find_number(js, strlen(js), "$.IFX_PRESENCE_CONFIRM_COUNT", IFX_PRESENCE_CONFIRM_COUNT);
    ps_config->state_status_cb = state_status_callback;
    ps_config->state_change_cb = state_change_callback;

    ps_config->range_spectrum_mode = mjson_find_number(js, strlen(js), "$.IFX_RANGE_SPECTRUM_MODE", IFX_RANGE_SPECTRUM_MODE);
    ps_config->threshold_factor_presence_peak =  mjson_find_number(js, strlen(js), "$.IFX_THRESHOLD_FACTOR_PRESENCE_PEAK", IFX_THRESHOLD_FACTOR_PRESENCE_PEAK);
    ps_config->threshold_factor_absence_peak =  mjson_find_number(js, strlen(js), "$.IFX_THRESHOLD_FACTOR_ABSENCE_PEAK", IFX_THRESHOLD_FACTOR_ABSENCE_PEAK);
    ps_config->threshold_factor_absence_fine_peak =  mjson_find_number(js, strlen(js), "$.IFX_THRESHOLD_FACTOR_ABSENCE_FINE_PEAK", IFX_THRESHOLD_FACTOR_ABSENCE_FINE_PEAK);

    free(js);

    return IFX_OK;
}

void wrong_usage(char * reason) {
    puts(reason);
    puts(usage_str);
    exit(EXIT_FAILURE);
}

bool file_exists(const char*  path)
{
    if(access(path, F_OK) != -1)
        return true;

    return false;
}

CmdLineOptions_t decode_cmd_line_options(int argc, char** argv)
{
    CmdLineOptions_t opt = {0};
    while(argc > 1) {
        argc--; argv++;
        const char* opt_str = (*argv);

        if(!strcmp(opt_str, "-h") || !strcmp(opt_str, "-help")) {
            puts(usage_str);
            exit(EXIT_SUCCESS);
        }

        if(!strcmp(opt_str, "-d")) {
            argc--; argv++;
            if(!argc)
                wrong_usage("Missing data file path argument\n");
            opt.data_file_path = (*argv);
            if(!file_exists(opt.data_file_path)){
                puts("Data file on specified path does not exists.\n");
                exit(EXIT_FAILURE);
            }
            continue;
        }

        if(!strcmp(opt_str, "-c")) {
            argc--; argv++;
            if(!argc)
                wrong_usage("Missing config file path argument\n");
            opt.config_file_path = (*argv);

            if(!file_exists(opt.config_file_path)){
                puts("Configuration file on specified path does not exists.\n");
                exit(EXIT_FAILURE);
            }
            continue;
        }

        if(!strcmp(opt_str, "-r")) {
            argc--; argv++;
            if(!argc)
                wrong_usage("Missing record file path argument\n");
            opt.record_file_path = (*argv);

            if(file_exists(opt.config_file_path)){
                puts("Warning, specified will be overwritten.\n");
            }
            continue;
        }
        puts("Unkown Option: ");
        puts(opt_str);
        puts(usage_str);
        exit(EXIT_FAILURE);
    }

    return opt;
}

char* get_matrix_from_file(FILE* f , ifx_Matrix_R_t* matrix)
{
    char temp[24];
    char *cur_pos;
    for(int i=0; i < matrix->rows; i++) {
        for(int j=0; j < matrix->columns; j++) {
            do {
                cur_pos = fgets(temp, 24, f);
                if(cur_pos == NULL)
                    return NULL;
            } while(*cur_pos == '\n');
            ifx_Float_t value = (ifx_Float_t)atof(temp);
            ifx_matrix_set_element_r(matrix, i, j, value);
        }
    }
    return cur_pos;
}

void print_matrix_to_file_r(FILE* f, ifx_Matrix_R_t* matrix)
{
    ifx_Float_t cur_val;
    for(int i = 0; i < matrix->rows; i++){
        for(int j=0; j< matrix->columns; j++) {
            ifx_matrix_get_element_r(matrix, i, j, &cur_val);
            fprintf(f, "%f,", cur_val);
        }
        fprintf(f, "\n");
    }
}

void print_matrix_to_file_c(FILE* f, ifx_Matrix_C_t* matrix)
{
    ifx_Complex_t cur_val;
    for(int i = 0; i < matrix->rows; i++){
        for(int j=0; j< matrix->columns; j++) {
            ifx_matrix_get_element_c(matrix, i, j, &cur_val);
            fprintf(f, "%f,", cabsf(cur_val));
        }
        fprintf(f, "\n");
    }
}

void signal_handler(int sig)
{
    if(sig != SIGINT)
        return;

    if(g_device_handle)
    {
#ifdef _WIN32
#else
        // digitalWrite(LED_PIN, 1);
#endif
    }
    g_is_running = false;
}

int main(int argc, char** argv)
{
    ifx_Error_t ret = 0;
    FILE* file_record = NULL;
    FILE* file_data = NULL;
    ifx_PresenceSensing_Config_t ps_config;
    ifx_PresenceSensing_Result_t ps_result;

	printf("Radar SDK Version: %s\n", ifx_radar_sdk_get_version_string());
		
    get_abs_conf_path(argv);

    signal(SIGINT, signal_handler);
    CmdLineOptions_t opt = decode_cmd_line_options(argc, argv);

    if(opt.record_file_path) {
        file_record = fopen(opt.record_file_path, "w");
        if(file_record == NULL) {
            fprintf(stderr, "Could not open file %s", opt.record_file_path);
        }
    }

    if(opt.data_file_path) {
        file_data = fopen(opt.data_file_path, "r");
        if(file_data == NULL) {
            fprintf(stderr, "Could not open file %s", opt.data_file_path);
        }
    }

    if(get_config(opt.config_file_path, &ps_config))
    {
        fprintf(stderr, "failed to get config information!\n");
        return EXIT_FAILURE;
    }

    if(ifx_time_create(&g_time_handle))
    {
        fprintf(stderr, "failed creating time handle!\n");
        return EXIT_FAILURE;
    }

    if(opt.data_file_path == NULL) {
        if(ifx_device_create(&ps_config.device_config, &g_device_handle))
        {
            fprintf (stderr, "failed init device!\n");
            return EXIT_FAILURE;
        }
    }

#ifdef _WIN32
#else
    // if(wiringPiSetup() == -1)
    //     return EXIT_FAILURE;

    // pinMode(LED_PIN, OUTPUT);
    // digitalWrite(LED_PIN, 1);
#endif

    ifx_PresenceSensing_Handle_t* presencesensing;
    ret = ifx_presencesensing_create(&ps_config, &presencesensing);
    IFX_ERR_CHECK_RETURN(ret);

    ret = ifx_presencesensing_create_result(presencesensing, &ps_result);
    IFX_ERR_CHECK_RETURN(ret);

    ifx_Frame_t frame = {0};
    if(file_data == NULL)
    {
    	ret = ifx_device_create_frame_from_device_handle(g_device_handle, &frame);
    	IFX_ERR_CHECK_RETURN(ret);
    }
    else
    {
    	//@todo this whole else block assumes some data format and allocates memory for frame!
    	//and its therfore usable only within app presence detection
    	//it should be based on information extracted from the recorded file and not based on
    	//assumptions or app config files.
    	//e.g., first param of this calloc, num antennas, is 1 because presence sensing
    	//uses only 1 rx antenna. size of the matrix created uses num chirp and num samples
    	//from the app config data.
    	//once a file recording and playback module is ready use the file read API from that
    	//here , to get required device info, and frame format info from that file!!

    	ifx_device_create_frame(1,
    			                ps_config.device_config.num_chirps_per_frame,
								ps_config.device_config.num_samples_per_chirp,
								&frame);

    }

    while(g_is_running)
    {
        if(file_data) {
            if(get_matrix_from_file(file_data, &frame.rx_data[0]) == NULL)
            {
            	ret = IFX_ERROR_ARGUMENT_INVALID;
            	IFX_ERR_CHECK_BREAK(ret);
            }
        }
        else {
            ret = ifx_device_get_next_frame(g_device_handle, &frame);
            IFX_ERR_CHECK_BREAK(ret);
        }

        if(file_record) {
            print_matrix_to_file_r(file_record, &frame.rx_data[0]);
        }

        ret = ifx_presencesensing_run(&frame.rx_data[0], presencesensing);
        IFX_ERR_CHECK_BREAK(ret);

        ret = ifx_presencesensing_get_result(presencesensing, &ps_result);
        IFX_ERR_CHECK_BREAK(ret);
    }

    ret = ifx_presencesensing_destroy_result(&ps_result);
    IFX_ERR_CHECK(ret);

    ret = ifx_presencesensing_destroy(presencesensing);
    IFX_ERR_CHECK(ret);

    if(g_device_handle) {
        fprintf(stderr, "Closing Device\n");
        ret = ifx_device_destroy(g_device_handle);
        g_device_handle = NULL;
        IFX_ERR_CHECK(ret);
    }

    ret = ifx_time_destroy(g_time_handle);
    g_time_handle = NULL;

    if(file_data)
        fclose(file_data);
    if(file_record)
        fclose(file_record);

    return ret;
}


