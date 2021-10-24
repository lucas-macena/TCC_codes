const express = require('express')
const router = express.Router()
const usuarios = require('../controllers/usuariosController')
const whitelist = require('../models/whitelist')

router.get("/",whitelist.validarLogin,usuarios.usuarios)
router.post("/",usuarios.usuarios)

module.exports = {
    router
}