const Database = require('../database/db')
const {procurar_usuario,procurar_tombamentos,procurar_todos_tombamentos, procurar_topicos, validar_usuario} = require('../models/searchDBs')
const { render } = require('nunjucks');
const whitelist = require('../models/whitelist')
const servidor = require('../models/localhost')


var info='';

async function supervisorio(req,res){
    const infoRecebida = info;
    info='';
    const usuario = await whitelist.whoIsIt(req)
    
    const receivedUser = usuario.user
    
    const endereço = servidor.localhost()
    ficha = await procurar_usuario(receivedUser)
    tombamentos = await procurar_tombamentos(ficha)
    
    return res.render("supervisorio.html",{infoRecebida,receivedUser,tombamentos,endereço})
}

module.exports = {
    supervisorio
}