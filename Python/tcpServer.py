from socket import *
serverPort = 10001
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverSocket.listen(2)
print('The server is ready to receive')
connectionSocket, addr = serverSocket.accept()
print(f'Porta do cliente: {addr}')
while 1:
    # if addr[1] != 62352:
    #     print('Cliente não autorizado!')
    #     connectionSocket.close()
    sentence = connectionSocket.recv(1024)

    # if(str(600) in sentence):
    #
    #
    #     connectionSocket.send(bytes("Oi ESP8266!","utf-8"))
    if sentence:
        print(sentence)

    # connectionSocket.close()

