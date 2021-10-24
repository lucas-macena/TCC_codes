const express = require('express')
const router = express.Router()

const whitelist = require('../models/whitelist')
const fichaUser = require('../controllers/fichaUserController')


router.get('/',whitelist.validarLogin,fichaUser.handleFicha)


module.exports = {
    router
}