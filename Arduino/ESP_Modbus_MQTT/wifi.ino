#include "wifi.h"

void conectarWiFi() 
{
    //se ja esta conectado a rede WI-FI, nada e feito. 
    //Caso contrario, sao efetuadas tentativas de conexao
    if (WiFi.status() == WL_CONNECTED)
        return;

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(SSID);

    if (!WiFi.config(ip, dns, gateway, subnet)) {
        Serial.println("Falha ao configurar a rede!");
    }


    WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI
    
    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(100);
        Serial.print(".");
    }
   
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(SSID);
    Serial.println();
    Serial.print("IP local: ");
    Serial.println(WiFi.localIP());
    Serial.print("Gateway padrao: ");
    Serial.println(WiFi.gatewayIP());
    Serial.print("Mascara de subrede: ");
    Serial.println(WiFi.subnetMask());
    Serial.print("DNS: ");
    Serial.println(WiFi.dnsIP());
    Serial.println();
}

void TCPconnect(){

  Serial.print("Conectando ao servidor ");
  Serial.print(host);
  Serial.print(':');
  Serial.println(port);
  
  if (!TCPClient.connect(host, port)) {
      Serial.println("Falha de conexao com o Python");
      TCPClient.stop();
      return;
    }
  else{
      Serial.println("Conectado ao servidor Python");
      
      return;
  }
}

void TCPSend(){

    if (millis() - timeout < 100) {return;}
    
    timeout = millis();

    if (TCPClient.connected() && tryToConnect) {

      TCPClient.print(ref);
 
      if (TCPClient.available()) {
        char ch = static_cast<char>(TCPClient.read());
        Serial.print(ch);
        
      }
//      TCPClient.stop();
    }
    else{
      if ((!TCPClient.connect(host, port)) && tryToConnect) {
          Serial.println("Falha de conexao com o Python");
          TCPClient.stop();
          tryToConnect=false;
          return;
        }
        Serial.println("oi");
      }
      return;
}
  
