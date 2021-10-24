const Database = require('../database/db');
const { render } = require('nunjucks');

const {procurar_usuario,procurar_tombamentos,procurar_todos_tombamentos, procurar_topicos, validar_usuario} = require('../models/searchDBs');
const whitelist = require('../models/whitelist')

const servidor = require('../models/localhost')



async function index(req,res) {
    const data = req.body
    const usuario = await whitelist.whoIsIt(req)
    const userConnected = usuario.name
    
    const endereço = servidor.localhost()
    return res.render("index.html",{userConnected,endereço})
    
}

module.exports = {
    index
}