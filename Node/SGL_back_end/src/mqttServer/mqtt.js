var mqtt = require('mqtt')
var client;
var info='';

function mqttClient() {
    client  = mqtt.connect('mqtt://broker.hivemq.com')

    client.on('message', function (topic, message) {
        // message is Buffer
      //   console.log(message.toString())
      //   client.end()
          info = message.toString();
      })

    client.on('connect', function () {
        client.subscribe('MacenaRecebe', function (err) {
          if (!err) {
            
          }
        })
      })
    
      return client;
}

module.exports = {
    mqttClient,
    info
    
    
}