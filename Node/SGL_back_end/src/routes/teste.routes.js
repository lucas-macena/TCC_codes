const express = require('express')
const router = express.Router()
const whitelist = require('../models/whitelist')
const servidor = require('../models/localhost')

async function testeController(req,res) {
    const data = req.body
    const token = 'token de teste'
    const endereço = servidor.localhost()
    return res.render("testes.html",{token,endereço})
   
    
}



router.get('/', testeController)
router.post('/',testeController)

module.exports = {
    router
}