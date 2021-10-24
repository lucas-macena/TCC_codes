const Database = require('../database/db')
const { render } = require('nunjucks');
const {procurar_usuario,procurar_tombamentos,procurar_todos_tombamentos, procurar_topicos, validar_usuario} = require('../models/searchDBs')
const whitelist = require('../models/whitelist')

var userConnected="admin";

function login(req,res) {
    const data = req.body   
    
    return res.render("login.html")
}

async function efetuarLogin(req,res) {
    const data = req.body
    
    const lerBanco = await validar_usuario(data.user,data.pass)
    
    if(lerBanco==1){
        const user = await procurar_usuario(data.user)
        
        const newLogin = await whitelist.newLogin(req,user[0])
        res.redirect('/')
    }
    else{res.redirect('/login')}
}

module.exports = {
    login,
    efetuarLogin
}