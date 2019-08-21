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
 * @file time_formatter.h
 *
 * @brief This file defines the API for time formatting
 *
 *
 */

#ifndef INC_IFXRADAR_TIME_H_
#define INC_IFXRADAR_TIME_H_


/*
==============================================================================
   1. INCLUDE FILES
==============================================================================
*/
#include "ifxRadar_Types.h"
#include "ifxRadar_Error.h"
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
typedef struct ifx_Time_Handle ifx_Time_Handle_t;

/*
==============================================================================
   5. FUNCTION PROTOTYPES
==============================================================================
*/
ifx_Error_t ifx_time_create(ifx_Time_Handle_t** handle);
ifx_Float_t ifx_time_get_s(ifx_Time_Handle_t* handle);
char* ifx_time_get_cstr(ifx_Time_Handle_t* handle);
ifx_Error_t ifx_time_destroy(ifx_Time_Handle_t* handle);

#endif /* INC_IFXRADAR_TIME_H_ */
