client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "clientId-" + parseInt(Math.random() * 100, 10)+2);
// set callback handlers
 client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
onSuccess:onConnect,
onFailure:doFail
}
// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("MacenaRecebe");
  messagem = new Paho.MQTT.Message("D");
  messagem.destinationName = "MacenaRecebe";
  client.send(messagem);


  

}
function doFail(e){
  console.log(e);
  }
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);

  let data = message.payloadString;
  document.write(`meus dados são: ${data}\n`);


}

