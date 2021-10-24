const Database = require('../database/db')

const {procurar_usuario,procurar_tombamentos,procurar_todos_tombamentos, procurar_topicos, validar_usuario,procurar_logs} = require('../models/searchDBs')
const { render } = require('nunjucks');
const servidor = require('../models/localhost')
const aboutModel = require('../models/atualizarFicha')

const whitelist = require('../models/whitelist')


function orgLogs(logs){
    var logsOrganizados = []
    var orgIndex = logs.length - 1
    
    for (let index = 0; index < logs.length; index++) {
        logsOrganizados[orgIndex]=logs[index];
        orgIndex--;
          
    }
    
    return logsOrganizados
}

async function about(req,res){
    const usuario = await whitelist.whoIsIt(req)
    const endereço = servidor.localhost()

    const userConnected = usuario.user

    const fichaUsuario = await procurar_usuario(userConnected)
    const ficha = fichaUsuario[0]
    
    const tombamentos = await procurar_tombamentos(fichaUsuario)
    var logs = await procurar_logs(userConnected)

    logs = orgLogs(logs)

    return res.render('about.html',{userConnected,endereço,ficha,tombamentos,logs})
}

async function atualizarFicha(req,res){
    const data = req.body
    
    const usuario = await whitelist.whoIsIt(req)
    const endereço = servidor.localhost()

    const userConnected = usuario.user
    

    if(data.github!=undefined){
        aboutModel.atualizarFicha(data)
    }

    else{
        const newLog = await aboutModel.inserirLog(data)
    }
    
    const fichaUsuario = await procurar_usuario(userConnected)
    const ficha = fichaUsuario[0]
    const tombamentos = await procurar_tombamentos(fichaUsuario)
    var logs = await procurar_logs(userConnected)

    logs = orgLogs(logs)
    
    return res.render('about.html',{userConnected,endereço,ficha,tombamentos,logs})
}

module.exports = {
    about,
    atualizarFicha
}