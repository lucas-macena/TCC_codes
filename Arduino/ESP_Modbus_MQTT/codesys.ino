#include "codesys.h"

void pinConfig()
{
    pinMode(NODE_PIN_D0, OUTPUT);
    pinMode(NODE_PIN_D1, OUTPUT);
    pinMode(NODE_PIN_D2, OUTPUT);
    pinMode(NODE_PIN_D3, OUTPUT);
    
    pinMode(NODE_PIN_D4, INPUT);
    pinMode(NODE_PIN_D5, INPUT);
    pinMode(NODE_PIN_D6, INPUT);
    pinMode(NODE_PIN_D7, INPUT);
    
    pinMode(NODE_PIN_D8, OUTPUT);
}

void PrintHex(uint8_t *data, uint8_t length) // prints 8-bit data in hex with leading zeroes
{
    for (int i=0; i<length; i++) 
    {
        if (data[i] < 0x10)
            Serial.print("0");
        Serial.print(data[i], HEX); Serial.print(" ");
    }
    Serial.println();
}

void updateIO()
{
    
    for (int i = 1; i < sizeof(pinMask_DIN); i++)
    {        
        mb_discrete_input[i] = digitalRead(pinMask_DIN[i]); 
    }
    

    for (int i = 0; i < sizeof(pinMask_DOUT); i++)
    {
        digitalWrite(pinMask_DOUT[i], mb_coils[i]);
    }
    
    for (int i = 0; i < sizeof(pinMask_AIN); i++)
    {

        if(modbus_buffer[7] == MB_FC_READ_INPUTS){motor.lerVelocidade();}
        if(new_ref){mb_input_regs[i] = (ref);}
        
        
        else{mb_input_regs[i] = motor.RPM;}

    }

    for (int i = 0; i < sizeof(pinMask_AOUT); i++)
    {
        analogWrite(pinMask_AOUT[i], mb_holding_regs[i]);
    }

    
    
    if(mb_coils[1]==true){
      new_ref=false;
      }
    mb_discrete_input[0]=new_ref;

}
