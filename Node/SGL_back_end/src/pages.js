const Database = require("./database/db")
const {procurar_usuario,procurar_tombamentos, procurar_todos_tombamentos, procurar_topicos, validar_usuario} = require('./models/searchDBs')
const whitelist = require('./models/whitelist')

const servidor = require('./models/localhost')
const endereço = servidor.localhost()

var mqtt = require('mqtt');
const { render } = require('nunjucks');
var client;
var info='';
var topicoEnviar;
var listenFrom = "";
var isConnected;


function mqttClient(topico) {
    client  = mqtt.connect('mqtt://broker.hivemq.com')

    client.on('message', function (topic, message) {
          info = message.toString();
      })

    client.on('connect', function () {
        client.subscribe(topico, function (err) {
          if (!err) {
            
          }
        })
      })
    
}


async function conectar(req,res) {
    const data = req.body
    
    const tomb = data.tomb

    const usuario = await whitelist.whoIsIt(req)
    
    const receivedUser = usuario.user
    
    
    ficha = await procurar_usuario(receivedUser)
    tombamentos = await procurar_tombamentos(ficha)
    topicos = await procurar_topicos(tomb)

    topicoEnviar = topicos[0].topicoEnviar
    listenFrom = topicos[0].topicoReceber

    mqttClient(topicos[0].topicoReceber);
    isConnected = "conectado";
    

    return res.render("supervisorio.html",{isConnected,receivedUser,tombamentos,topicoEnviar,tomb,endereço})
}

async function desconectar(req,res) {
    const data = req.body
    
    const tomb = data.tomb
    
    const usuario = await whitelist.whoIsIt(req)
    
    const receivedUser = usuario.user

    isConnected = "desconectado";
    client.unsubscribe('MacenaRecebe')
    
    client.end();
    ficha = await procurar_usuario(receivedUser)
    tombamentos = await procurar_tombamentos(ficha)
    return res.render("supervisorio.html",{isConnected,receivedUser,tombamentos,tomb,endereço})
    
}


async function sendData(req,res){
    const data = req.body

    const usuario = await whitelist.whoIsIt(req)
    
    const receivedUser = usuario.user

    
    const topicoEnviar = data.topicoEnviar
    const tomb = data.tomb
    
    
    const db = await Database

    fichaUsuario = await procurar_usuario(receivedUser)
    fichaTomb = await procurar_tombamentos(ficha)


    var isAutorized = false;
    for(var k in fichaTomb){
        // console.log(fichaTomb[k].topicoEnviar)
        if (fichaTomb[k].topicoEnviar == topicoEnviar){
            isAutorized = true;
            
        } 
    }
    
    if (fichaUsuario[0].access == "admin" || fichaUsuario[0].tombamento == "all"){isAutorized=true}
    

    const queryMessageSent = `
    INSERT INTO messagesSent (
        user,
        message,
        sendTo,
        name,
        sendTime
    ) VALUES (
        "${receivedUser}",
        "${data.refPID}",
        "${topicoEnviar}",
        "${tomb}",
        (datetime('now','localtime'))
    );
    `
    
    try {
        client.publish(topicoEnviar,data.refPID)
        const sendMessage = await db.run(queryMessageSent)
        
    } catch (error) {
        console.log("Não conectado à nenhum tópico")
    }

    
    return res.render("supervisorio.html",{isConnected,isAutorized,receivedUser,tombamentos,topicoEnviar,tomb,endereço})
}







module.exports = {
    sendData,
    conectar,
    desconectar
}