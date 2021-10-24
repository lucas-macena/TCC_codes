#include "MQTT.h"

void initMQTT() 
{
    MQTT.setServer(BROKER_MQTT, BROKER_PORT);   //informa qual broker e porta deve ser conectado
    MQTT.setCallback(mqtt_callback);            //atribui funcao de callback (funcao chamada quando qualquer informacao de um dos topicos subescritos chega)
    MQTT.subscribe(TOPICO_SUBSCRIBE);
}

void EnviaEstadoOutputMQTT(void)
{

    rpmOut = motor.RPM;

    char rpmMQTT[16];
    itoa(rpmOut,rpmMQTT,10);
    MQTT.publish(TOPICO_PUBLISH, rpmMQTT);

}

void reconnectMQTT() 
{
    while (!MQTT.connected()) 
    {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) 
        {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            MQTT.subscribe(TOPICO_SUBSCRIBE); 
        } 
        else
        {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Havera nova tentativa de conexao em 2s");

        }
    }
}

void VerificaConexoesWiFIEMQTT(void)
{
    if (!MQTT.connected()) 
        reconnectMQTT(); //se nao ha conexao com o Broker, a conexao e refeita
     
     conectarWiFi(); //se nao ha conexao com o WiFI, a conexao e refeita
}

void mqtt_callback(char* topic, byte* payload, unsigned int length) 
{
    String msg;
    String comando;
    
    
    
    for(int i = 0; i < length; i++) 
    {
       
       char c = (char)payload[i];
       msg += c;
       
    }
   comando += msg[0];
  

    if (msg.equals("RST")){reiniciar_esp();}
    
    if (comando.equals("R")){nova_referencia(msg,length);}
    if (comando.equals("C")){tryToConnect=true;}
}
  

void nova_referencia(String msg,int tamanho){
  Serial.print("Nova referencia: ");

  ref = 0;
  int mult = 1;
  for(int i = tamanho-1; i > 0;i--){
    ref += (int)(msg[i]-48)*mult;
    mult = mult*10;

    }
  
  new_ref=true;
  Serial.println(ref);

}

void reiniciar_esp(){
//  Serial.println("Comando de reset");
  analogWrite(pinMask_AOUT[0], 0);
  ESP.restart();
}
