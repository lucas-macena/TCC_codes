const Database = require('../database/db')
const { render } = require('nunjucks');
const servidor = require('../models/localhost')

const whitelist = require('../models/whitelist')

async function searchFor(req,res) {
    const data = req.body
    const endereço = servidor.localhost()
    const nome = data.tombamento;
    
    
    const usuario = await whitelist.whoIsIt(req)
    const userConnected = usuario.name
    const acesso = usuario.access
    

    var tipoBusca = data.busca
    
    if(tipoBusca=="buscaName"){tipoBusca = "name"}
    if(tipoBusca=="buscaRef"){tipoBusca = "referencia"}
    if(tipoBusca=="buscaState"){tipoBusca = "state"}
    if(tipoBusca=="buscaGerente"){tipoBusca = "gerente"}
    
    var tombQuery = `WHERE ${tipoBusca} LIKE "%${nome}%"`
    if(nome==""){tombQuery=""}
    const query = `
            SELECT *
            FROM tombamentos
            ${tombQuery};
        `

    try {
        const db = await Database
        const tombamentos = await db.all(query)
        
        // console.log(tombamentos)
        
        
        return res.render("equipamentos.html",{tombamentos,userConnected,endereço,acesso})
    } catch (error) {
        console.log('erro no banco de dados')
        // return res.render("supervisorio.html")
    }
    
    
}

function equipamentos(req,res) {
    const endereço = servidor.localhost()
    const userConnected='admin'
    
    return res.render("equipamentos.html",{userConnected,endereço})
}



module.exports = {
    searchFor,
    equipamentos
}