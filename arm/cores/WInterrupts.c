/*
  Copyright (c) 2011 Arduino.  All right reserved.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

  Copyright (c) 2018 Infineon Technologies AG
  This file has been modified for the XMC microcontroller series.
*/

//****************************************************************************
// @Project Includes
//****************************************************************************
#include "WInterrupts.h"

//****************************************************************************
// @Prototypes Of Local Functions
//****************************************************************************
static interrupt_cb_t interrupt_0_cb = NULL;
static interrupt_cb_t interrupt_1_cb = NULL;

//****************************************************************************
// @Local Functions
//****************************************************************************
void CCU40_0_IRQHandler(void)
{
    if (interrupt_0_cb)
    {
        interrupt_0_cb();
    }
}

void CCU40_1_IRQHandler(void)
{
    if (interrupt_1_cb)
    {
        interrupt_1_cb();
    }
}

void attachInterrupt(uint32_t interrupt_num, interrupt_cb_t callback, uint32_t mode)
{
    if (interrupt_num < NUM_INTERRUPT)
    {
        XMC_PIN_INTERRUPT_t pin_irq = mapping_interrupt[interrupt_num];
        XMC_CCU4_SLICE_EVENT_CONFIG_t event_config = {0};

        switch (mode)
        {
            case CHANGE:
                event_config.edge = XMC_CCU4_SLICE_EVENT_EDGE_SENSITIVITY_DUAL_EDGE;
                break;

            case RISING:
                event_config.edge = XMC_CCU4_SLICE_EVENT_EDGE_SENSITIVITY_RISING_EDGE;
                break;

            case FALLING:
                event_config.edge = XMC_CCU4_SLICE_EVENT_EDGE_SENSITIVITY_FALLING_EDGE;
                break;

            default:
                event_config.edge = XMC_CCU4_SLICE_EVENT_EDGE_SENSITIVITY_NONE;
                break;
        }

        XMC_CCU4_Init(pin_irq.ccu, XMC_CCU4_SLICE_MCMS_ACTION_TRANSFER_PR_CR);
        XMC_CCU4_EnableClock(pin_irq.ccu, pin_irq.slice_num);

        if (pin_irq.irq_num == 0)
        {
#if defined(XMC1100_Boot_Kit)
            /* P1_4 external interrupt goes through USIC to CCU4 */
            XMC_USIC_CH_Enable(XMC_USIC0_CH0);
            XMC_USIC_CH_SetInputSource(XMC_USIC0_CH0, XMC_USIC_CH_INPUT_DX5, USIC0_C0_DX5_P1_4);
            XMC_USIC_CH_SetInputSource(XMC_USIC0_CH0, XMC_USIC_CH_INPUT_DX2, USIC0_C0_DX2_DX5INS);
#endif
            XMC_CCU4_SLICE_EnableMultipleEvents(pin_irq.slice, XMC_CCU4_SLICE_MULTI_IRQ_ID_EVENT0);
            XMC_CCU4_SLICE_SetInterruptNode(pin_irq.slice, XMC_CCU4_SLICE_IRQ_ID_EVENT0, 0);
            NVIC_SetPriority(CCU40_0_IRQn, 3);

            event_config.mapped_input = pin_irq.input;
            XMC_CCU4_SLICE_ConfigureEvent(pin_irq.slice, XMC_CCU4_SLICE_EVENT_0, &event_config);

            interrupt_0_cb = callback;
            NVIC_EnableIRQ(CCU40_0_IRQn);
        }
        else if (pin_irq.irq_num == 1)
        {
#if defined(XMC1300_Boot_Kit)
            /* P0_13 external interrupt goes through USIC to CCU4 */
            XMC_USIC_CH_Enable(XMC_USIC0_CH0);			
			XMC_USIC_CH_SetInputSource(XMC_USIC0_CH0, XMC_USIC_CH_INPUT_DX2, USIC0_C0_DX2_P0_13);
#endif
            XMC_CCU4_SLICE_EnableMultipleEvents(pin_irq.slice, XMC_CCU4_SLICE_MULTI_IRQ_ID_EVENT1);
            XMC_CCU4_SLICE_SetInterruptNode(pin_irq.slice, XMC_CCU4_SLICE_IRQ_ID_EVENT1, 1);
            NVIC_SetPriority(CCU40_1_IRQn, 3);

            event_config.mapped_input = pin_irq.input;
            XMC_CCU4_SLICE_ConfigureEvent(pin_irq.slice, XMC_CCU4_SLICE_EVENT_1, &event_config);

            interrupt_1_cb = callback;
            NVIC_EnableIRQ(CCU40_1_IRQn);
        }
    }
}

void detachInterrupt(uint32_t interrupt_num)
{
    if (interrupt_num < NUM_INTERRUPT)
    {
        switch (interrupt_num)
        {
            case 0:
                NVIC_DisableIRQ(CCU40_0_IRQn);
                break;

            case 1:
                NVIC_DisableIRQ(CCU40_1_IRQn);
                break;

            default:
                break;
        }
    }
}

//****************************************************************************
//                                 END OF FILE
//****************************************************************************