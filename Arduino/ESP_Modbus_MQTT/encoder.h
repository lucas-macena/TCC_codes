
#ifndef _encoder_H_
#define _encoder_H_

#define CASA

class encoder{
  public:
  short int pinA;
  short int pinB;
  short int sensor;

  
  encoder(short int pinA, short int pinB, short int sensor);

  int lerVelocidade();
  volatile int count = 0;  
  unsigned int dT = 100;
  unsigned int pulsos_rot = 20;
  unsigned long int tempo_encoder = 0;
  
//  int k = (60*1000)/(dT*pulsos_rot);

  int RPM = 0;

  int RPM0 = 0;
};


void ISR_encoder();


#endif
