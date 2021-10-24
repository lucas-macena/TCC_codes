
#include <ESP8266WiFi.h>
#include <PubSubClient.h> // Importa a Biblioteca PubSubClient
/*********NETWORK CONFIGURATION*********/
#include "wifi.h"
#include "modbus.h"
#include "codesys.h"

#include "MQTT.h"
#include "encoder.h"
/***************************************/
#define motorA NODE_PIN_D0
#define motorB NODE_PIN_D1
#define encoderPin NODE_PIN_D5

#define T 2000

unsigned long int t=0;

// MQTT


//Variaveis e objetos globais
WiFiClient espClient; // Cria o objeto espClient
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient 


WiFiServer server(502);

encoder motor(motorA , motorB, encoderPin);


void setup()
{
    Serial.begin(115200);
    delay(10);
    
    pinConfig();
    
    // Connect to WiFi network
    conectarWiFi();

    // Start the server
    server.begin();
    Serial.println("Aguardando comunicacao Modbus");
    
    updateIO();

    initMQTT();
//    TCPconnect();
}



void loop()
{

    
    WiFiClient client = server.available();
    if (!client)
        
        return;
    
    Serial.println("Nova conexao Modbus");

    while(client.connected())
    {
        // Wait until the client sends some data
        while(!client.available())
        {
            
            delay(1);
            if (!client.connected())
                return;
        }
        
        int i = 0;
        while(client.available())
        {
            modbus_buffer[i] = client.read();
            i++;

            if (i == 100)
                break;
        }

        //DEBUG
        /*
        Serial.print("Received MB frame: ");
        PrintHex(modbus_buffer, i);
        */
        MQTT.loop();
        updateIO();
        unsigned int return_length = processModbusMessage(modbus_buffer, i);
        client.write((const uint8_t *)modbus_buffer, return_length);

        

        VerificaConexoesWiFIEMQTT();
    
        //envia o status de todos os outputs para o Broker no protocolo esperado
        if (millis()-t>T){
          EnviaEstadoOutputMQTT();
          t = millis();  
        }
//        TCPSend();
//        MQTT.loop();
    }
    
    Serial.println("Modbus Desconectado");
    
}

 
