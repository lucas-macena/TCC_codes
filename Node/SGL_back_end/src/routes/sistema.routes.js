const express = require('express')
const router = express.Router()
const sistema = require('../controllers/sistemaController')
const whitelist = require('../models/whitelist')

router.get('/',whitelist.validarLogin,sistema.sistema)
router.post('/newUser',sistema.cadNewUser)
router.post('/newTomb',sistema.cadNewUser)

module.exports = {
    router
}