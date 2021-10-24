const Database = require('../database/db')
const whitelist = require('../models/whitelist')

const searchDBS = require('../models/searchDBs')
const editarBanco = require('../models/editDBs')

async function handleFicha(req,res,next){
    const data = req.headers
    
    const usuario = await whitelist.whoIsIt(req)
    
    const tomb = data.tomb

    const ficha = await searchDBS.procurar_tombamentos([{tombamento:tomb}])
    const fichaTomb = ficha[0]
    const acesso = usuario.access
    

    const editando=true
    
    res.render('formEditTomb.html',{fichaTomb,acesso,editando})
}

async function salvarAlteracao(req,res,next){
    
    
    const data = req.query
    
    
    const usuario = await whitelist.whoIsIt(req)
    if(usuario.access!='admin'){res.redirect('/login')}

    const tomb = data.tomb
    const gerente = data.gerente
    const ref = data.ref
    const mqttEnviar = data.mqttEnviar
    const mqttRec = data.mqttRec
    const ip = data.ip
    var atualizado
    atualizado = await editarBanco.editarRow('tombamentos','gerente',gerente,'name',tomb)
    atualizado = await editarBanco.editarRow('tombamentos','referencia',ref,'name',tomb)
    atualizado = await editarBanco.editarRow('tombamentos','topicoEnviar',mqttEnviar,'name',tomb)
    atualizado = await editarBanco.editarRow('tombamentos','topicoReceber',mqttRec,'name',tomb)
    atualizado = await editarBanco.editarRow('tombamentos','ip',ip,'name',tomb)

    const editando = false

    const ficha = await searchDBS.procurar_tombamentos([{tombamento:tomb}])
    const fichaTomb = ficha[0]
    const acesso = usuario.access

    res.render('formEditTomb.html',{fichaTomb,acesso,editando})
}

module.exports = {
    handleFicha,
    salvarAlteracao
}