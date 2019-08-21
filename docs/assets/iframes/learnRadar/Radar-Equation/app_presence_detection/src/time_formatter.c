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
 * @file time_formatter.c
 *
 * @brief This file defines the API for time formatting
 *
 *
 */

/*
==============================================================================
   1. INCLUDE FILES
==============================================================================
*/
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "time_formatter.h"

/*
==============================================================================
   2. LOCAL DEFINITIONS
==============================================================================
*/
#define NUM_D_DIGITS 1
#define NUM_H_DIGITS 2
#define NUM_M_DIGITS 2
#define NUM_S_DIGITS 2
#define NUM_MS_DIGITS 3
#define NUM_ADDTIONAL_CHARS 6

#define STR(X) #X
#define XSTR(X) STR(X)
#define TIME_FORMAT "%0" XSTR(NUM_H_DIGITS) "d:%0" XSTR(NUM_M_DIGITS) \
                   "d:%0" XSTR(NUM_S_DIGITS) "d:%0" XSTR(NUM_MS_DIGITS) "d"

/*
==============================================================================
   3. LOCAL TYPES
==============================================================================
*/
struct ifx_Time_Handle
{
    clock_t start_clock;
    clock_t end_clock;
    char *cur_time_str;
    size_t cur_time_size;
    ifx_Float_t cur_time_s;
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

/*
==============================================================================
  6. LOCAL FUNCTIONS
==============================================================================
*/

/*
==============================================================================
   7. EXPORTED FUNCTIONS
==============================================================================
*/

ifx_Error_t ifx_time_create(ifx_Time_Handle_t **handle)
{
    *handle = malloc(sizeof(ifx_Time_Handle_t));

    if(*handle == NULL)
        return -1;

    (*handle)->start_clock = clock();
    (*handle)->cur_time_size = NUM_D_DIGITS + 2 + NUM_H_DIGITS +
            NUM_M_DIGITS + NUM_S_DIGITS +
            NUM_MS_DIGITS + NUM_ADDTIONAL_CHARS;
    (*handle)->cur_time_str = calloc(1, (*handle)->cur_time_size * sizeof(char));

    if((*handle)->cur_time_str == NULL)
        return -1;

    return 0;
}

ifx_Float_t ifx_time_get_s(ifx_Time_Handle_t* handle)
{
    handle->end_clock = clock();
    return (ifx_Float_t)(handle->end_clock - handle->start_clock) / (CLOCKS_PER_SEC);
}

char* ifx_time_get_cstr(ifx_Time_Handle_t* handle)
{
    int h, m, s, ms, d;
    ifx_Float_t time_in_s = ifx_time_get_s(handle) + 0.0005;
    s = (int)time_in_s;
    ms = (int)((time_in_s - s) * 1000);
    d = s / (3600 * 24);
    s = s - (d * (3600 * 24));
    h = s / 3600;
    s = s - (h * 3600);
    m = s / 60;
    s = s - (m * 60);
    if(d > 999)
        d  = 0;

    if(d)
        sprintf(handle->cur_time_str, "%dd "TIME_FORMAT, d, h, m, s, ms);
    else
        sprintf(handle->cur_time_str, TIME_FORMAT, h, m, s, ms);

    return handle->cur_time_str;
}

ifx_Error_t ifx_time_destroy(ifx_Time_Handle_t* handle)
{
    if(handle == NULL)
        return -1;

    free(handle->cur_time_str);
    free(handle);
    return 0;
}
