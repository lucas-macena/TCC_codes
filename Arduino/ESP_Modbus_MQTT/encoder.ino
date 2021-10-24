#include "encoder.h"

encoder::encoder(short int pinA, short int pinB, short int sensor){
  this->pinA = pinA;
  this->pinB = pinB;
  this->sensor = sensor;

  
  pinMode(pinA,OUTPUT);
  pinMode(pinB,OUTPUT);
  pinMode(sensor,INPUT);

  bool sentido = false;
  digitalWrite(pinA,sentido);
  digitalWrite(pinB,!sentido);

  attachInterrupt(digitalPinToInterrupt(sensor), ISR_encoder, RISING);
  
}

void ICACHE_RAM_ATTR ISR_encoder() {
  motor.count++;
}


int encoder::lerVelocidade(){
  dT = (millis() - tempo_encoder);
  
  
  detachInterrupt(digitalPinToInterrupt(sensor));
  RPM0 = (3000/dT)*count;
  RPM = 0.1*RPM0 + 0.9*RPM;
  count = 0;
  tempo_encoder = millis();

  attachInterrupt(digitalPinToInterrupt(sensor), ISR_encoder, RISING);
  return RPM;
}
