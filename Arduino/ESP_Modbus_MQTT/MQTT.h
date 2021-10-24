
#ifndef _MQTT_H_
#define _MQTT_H_

#define TOPICO_SUBSCRIBE "topicoEnviar"     //topico MQTT de escuta
#define TOPICO_PUBLISH   "topicoReceber"    //topico MQTT de envio de informacoes para Broker
#define ID_MQTT  "meuID"     //id mqtt (para identificacao de sessao)

const char* BROKER_MQTT = "broker.hivemq.com"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883; // Porta do Broker MQTT

unsigned int rpmOut;

int ref=0;

bool new_ref = false;

void initMQTT();
void EnviaEstadoOutputMQTT(void);
void reconnectMQTT();
void VerificaConexoesWiFIEMQTT(void);

void mqtt_callback(char* topic, byte* payload, unsigned int length);
void nova_referencia(String msg,int tamanho);
void reiniciar_esp();

#endif
