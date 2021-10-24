const Database = require('../database/db')
const { render } = require('nunjucks');
const whitelist = require('../models/whitelist')





async function logout(req,res){
    const sair = whitelist.checkoutLogin(req)
        
    return res.redirect('/login')
}

module.exports = {
    logout
}