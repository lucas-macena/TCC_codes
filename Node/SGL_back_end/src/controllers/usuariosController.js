const Database = require('../database/db')
const { render } = require('nunjucks');
const {procurar_usuario,procurar_tombamentos,procurar_todos_tombamentos, procurar_topicos, validar_usuario} = require('../models/searchDBs')
const servidor = require('../models/localhost')
const whitelist = require('../models/whitelist')



async function inserirNovoUsuario(data){
    if(data.nome=='' || data.usuarioNovo=='' || data.senha=='' || data.access=='' || data.tombamento=='' || data.github=='' || data.usuario!='admin'){
        console.log('usuario inválido')
        return false
    }
    const query = `
            INSERT INTO users (
                user,
                pass,
                name,
                access,
                tombamento,
                status,
                github,
                linkedin
            ) VALUES (
                "${data.usuarioNovo}",
                "${data.senha}",
                "${data.nome}",
                "${data.access}",
                "${data.tombamento}",
                "ATIVO",
                "${data.github}",
                "${data.linkedin}"
            );
        `

    try {
        const db = await Database
        const usuarios = await db.all(query)
        
        // console.log(tombamentos)
        
        return true    
        
    } catch (error) {
        console.log('erro no banco de dados')
        // return res.render("supervisorio.html")
    }
}

async function usuarios(req,res) {
    const data = req.body
    const endereço = servidor.localhost()
    const allTombs = await procurar_todos_tombamentos()
    
    const usuario = await whitelist.whoIsIt(req)
    const userConnected = usuario.user
    const isAutorized = usuario.access
    if(data.nome==undefined){
        
        return res.render("usuarios.html",{userConnected,allTombs,endereço,isAutorized})
    }

    const nome = data.nome;
    
    if(data.newUserFlag=='true'){
        console.log('novo usuario')
        const newUserLog = await inserirNovoUsuario(data)
        return res.render("usuarios.html",{userConnected,allTombs,newUserLog,endereço,isAutorized})
    }

    
    const cadastrarUser = true

    var tipoBusca = data.busca
    
    if(tipoBusca=="buscaName"){tipoBusca = "name"}
    if(tipoBusca=="buscaAcesso"){tipoBusca = "access"}
    if(tipoBusca=="buscaTomb"){tipoBusca = "tombamento"}
    if(tipoBusca=="buscaStatus"){tipoBusca = "status"}
    
    var userQuery = `WHERE ${tipoBusca} LIKE "${nome}%"`

    
    if(nome==""){userQuery=""}
    const query = `
            SELECT *
            FROM users
            ${userQuery};
        `

    try {
        const db = await Database
        const usuarios = await db.all(query)
        
        // console.log(tombamentos)
        
        return res.render("usuarios.html",{userConnected,cadastrarUser,usuarios,allTombs,endereço,isAutorized})    
        
    } catch (error) {
        console.log('erro no banco de dados')
        // return res.render("supervisorio.html")
    }

    
    
    
    
}



module.exports = {
    usuarios
}