const whitelist = require('../models/whitelist')

const Database = require('../database/db')

const searchDBs = require('../models/searchDBs')

function orgLogs(logs){
    var logsOrganizados = []
    var orgIndex = logs.length - 1
    
    for (let index = 0; index < logs.length; index++) {
        logsOrganizados[orgIndex]=logs[index];
        orgIndex--;
          
    }
    
    return logsOrganizados
}

async function handleFicha(req,res,next){
    const data = req.headers
    
    
    const usuario = await whitelist.whoIsIt(req)
    
    const userConnected = data.ficha

    const fichaUsuario = await searchDBs.procurar_usuario(userConnected)
    const ficha = fichaUsuario[0]
    
    var logs = await searchDBs.procurar_logs(userConnected)

    logs = orgLogs(logs)
    
    res.render('fichaUser.html',{logs,ficha})
}

module.exports = {
    handleFicha
}