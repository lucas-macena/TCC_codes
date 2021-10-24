const express = require('express')
const router = express.Router()
const index = require('../controllers/indexController')
const whitelist = require('../models/whitelist')


router.get('/',whitelist.validarLogin ,index.index)
router.post('/',index.index)

module.exports = {
    router
}