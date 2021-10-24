const express = require('express')
const router = express.Router()
const equipamentos = require('../controllers/equipamentosController')
const whitelist = require('../models/whitelist')

router.get('/',whitelist.validarLogin,equipamentos.equipamentos)
router.post('/',equipamentos.searchFor)

module.exports = {
    router
}