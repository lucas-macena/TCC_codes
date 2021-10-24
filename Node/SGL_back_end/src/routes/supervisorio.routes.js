const express = require('express')
const router = express.Router()
const supervisorio = require('../controllers/supervisorioController')
const whitelist = require('../models/whitelist')

router.get('/',whitelist.validarLogin,supervisorio.supervisorio)
router.post('/',supervisorio.supervisorio)

module.exports = {
    router
}