const Database = require("../database/db")
var mqtt = require('mqtt');

function teste(tempo) {
    setInterval(()=>{
        console.log('oi')
    },tempo)
}

async function mqttClient(topico) {
    client  = mqtt.connect('mqtt://broker.hivemq.com')

    client.on('message', async function (topic, message) {
          info = message.toString();
          
          try {
              const query = `UPDATE tombamentos SET state="online" WHERE topicoReceber = "${topic}";`
              const db = await Database;
              const salvar = await db.run(query)
          } catch (error) {
              
          }
          client.end()
      })

    client.on('connect',async function () {
        client.subscribe(topico, function (err) {
          if (!err) {
            setTimeout(async ()=>{

                client.end()
            },2000)
          }
        })
      })
    
}

async function listenMQTT() {
    setInterval(async ()=>{
        const listenTopicos = [
            "MacenaRecebe",
            "LMT02Equip"
        ]
        var listenLoop;
        const db = await Database;
        for(var k in listenTopicos){
           listenLoop = listenTopicos[k];
        //    console.log(listenLoop)
            var query = `UPDATE tombamentos SET state="offline" WHERE topicoReceber = "${listenLoop}";`
            
            const salvar = await db.run(query)
            
            await mqttClient(listenLoop)
        }
        
        
        
        
    },5000)
}

module.exports = {
    teste,
    listenMQTT
}