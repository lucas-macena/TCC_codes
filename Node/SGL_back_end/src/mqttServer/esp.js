var mqtt = require('mqtt')

class esp{

    constructor(topico){
        this.client  = mqtt.connect('mqtt://broker.hivemq.com')

        this.client.on('message', function (topic, message) {
            this.info = message.toString();
        })

        this.topico = topico

        this.client.on('connect', function () {
            this.client.subscribe(this.topico, function (err) {
            if (!err) {
                
            }
            })
        })
    }

    conectar(topico) {
        this.topico = topico

        this.client.on('connect', function () {
            this.client.subscribe(this.topico, function (err) {
            if (!err) {
                
            }
            })
        })
    }

    desconectar(){
        this.client.end();
    }

}

module.exports = {
    esp
}