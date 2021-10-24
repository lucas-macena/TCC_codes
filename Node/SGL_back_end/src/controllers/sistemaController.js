const Database = require('../database/db')
const { render } = require('nunjucks');
const {procurar_usuario,procurar_tombamentos,procurar_todos_tombamentos, procurar_topicos, validar_usuario} = require('../models/searchDBs')
const servidor = require('../models/localhost')
const whitelist = require('../models/whitelist')



async function inserirNovoUsuario(data){
    if(data.nome=='' || data.usuarioNovo=='' || data.senha=='' || data.access=='' || data.tombamento=='' || data.github==''){
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

async function sistema(req,res,next){
    const data = req.body
    const usuario = await whitelist.whoIsIt(req)
    const userConnected = usuario.name
    const isAutorized = usuario.access
    const endereço = servidor.localhost()
    const allTombs = await procurar_todos_tombamentos()
    return res.render("sistema.html",{userConnected,endereço,isAutorized,allTombs})
}

async function cadNewUser(req,res,next){
    const data = req.body
    
    const endereço = servidor.localhost()
    const allTombs = await procurar_todos_tombamentos()
    
    const usuario = await whitelist.whoIsIt(req)
    const userConnected = usuario.user
    const isAutorized = usuario.access

    const nome = data.nome;
    
    if(data.newUserFlag=='true' && isAutorized=='admin'){
        console.log('novo usuario')
        const newUserLog = await inserirNovoUsuario(data)
        return res.render("sistema.html",{userConnected,allTombs,newUserLog,endereço,isAutorized})
    }
}


module.exports = {
    sistema,
    cadNewUser
}