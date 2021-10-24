from socket import *
from time import  sleep
serverName = '192.168.0.10'

serverPort = 10001
clientPort = 62356

clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.bind(('', clientPort))
clientSocket.connect((serverName,serverPort))

i=0

while(1):
    # sentence = str(input('Input lowercase sentence: '))
    sentence = str(600)
    sentence = bytes(sentence, 'utf-8')
    clientSocket.send(sentence)
    # modifiedSentence = clientSocket.recv(1024)
    # modifiedSentence = str(modifiedSentence)[2:len(str(modifiedSentence)) - 1]
    # print(type(modifiedSentence))
    # print(f'From Server: {modifiedSentence}')

    # clientSocket.close()
    i+=1
    if(i>10):
        break
