const express = require('express')
const router = express.Router()

const whitelist = require('../models/whitelist')

const editTomb = require('../controllers/editTombController')

router.get('/',whitelist.validarLogin,editTomb.handleFicha)
router.post('/',editTomb.salvarAlteracao)


module.exports = {
    router
}