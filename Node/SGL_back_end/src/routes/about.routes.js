const express = require('express')
const router = express.Router()
const about = require('../controllers/aboutController')
const whitelist = require('../models/whitelist')

router.get('/',whitelist.validarLogin,about.about)
router.post('/',about.atualizarFicha)

module.exports = {
    router
}