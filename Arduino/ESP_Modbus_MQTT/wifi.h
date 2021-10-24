
#ifndef _wifi_H_
#define _wifi_H_



const char* SSID = "SSID"; // SSID / nome da rede WI-FI que deseja se conectar
const char* PASSWORD = "password"; // Senha da rede WI-FI que deseja se conectar
IPAddress ip(192,168,0,1); //COLOQUE UMA FAIXA DE IP DISPONIVEL DO SEU ROTEADOR. EX: 192.168.1.110 **** ISSO VARIA, NO MEU CASO E: 192.168.0.175
IPAddress dns(192,168,0,1);
IPAddress gateway(192,168,0,1); //GATEWAY DE CONEXAO (ALTERE PARA O GATEWAY DO SEU ROTEADOR)
IPAddress subnet(255,255,255,0); //MASCARA DE REDE
#endif

unsigned long timeout = 0;
const char* host = "192.168.0.10";
const uint16_t port = 10001;

void conectarWiFi();

// Use WiFiClient class to create TCP connections
WiFiClient TCPClient;
bool tryToConnect=true;

void TCPconnect();
void TCPSend();
#endif
