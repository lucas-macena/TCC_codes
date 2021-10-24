
#ifndef _codesys_H_
#define _codesys_H_

#define NODE_PIN_D0    16
#define NODE_PIN_D1   5
#define NODE_PIN_D2   4
#define NODE_PIN_D3   0
#define NODE_PIN_D4   2
#define NODE_PIN_D5   14
#define NODE_PIN_D6   12
#define NODE_PIN_D7   13
#define NODE_PIN_D8   15

uint8_t pinMask_DIN[] = { NODE_PIN_D4, NODE_PIN_D5, NODE_PIN_D6, NODE_PIN_D7 };
uint8_t pinMask_DOUT[] = { NODE_PIN_D0, NODE_PIN_D1, NODE_PIN_D2, NODE_PIN_D3 };
uint8_t pinMask_AIN[] = { A0 };
uint8_t pinMask_AOUT[] = { NODE_PIN_D8 };

unsigned char modbus_buffer[100];
int processModbusMessage(unsigned char *buffer, int bufferSize);

extern bool mb_discrete_input[MAX_DISCRETE_INPUT];
extern bool mb_coils[MAX_COILS];
extern uint16_t mb_input_regs[MAX_INP_REGS];
extern uint16_t mb_holding_regs[MAX_HOLD_REGS];

void pinConfig();
void PrintHex(uint8_t *data, uint8_t length);
void updateIO();

#endif
