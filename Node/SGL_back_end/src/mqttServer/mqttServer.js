const {Paho} = require("./paho-mqtt")

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
  messagem.destinationName = "MacenaEnvia";
  client.send(messagem);
//console.log(client.getTraceLog());

  //client.getTraceLog().forEach(function(line){
  //  console.log('Trace: ' + line)
  //});
  //newMessage = new Paho.MQTT.Message("Sent using synonyms!");
  //newMessage.topic = "/World";
//   client.publish(message)
//   client.publish("/World", "Hello from a better publish call!", 1, false)

//   topicMessage = new Paho.MQTT.Message("This is a message where the topic is set by setTopic");
//   topicMessage.topic = "/World";
//   client.publish(topicMessage)


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

module.exports = {
  client
}
  
