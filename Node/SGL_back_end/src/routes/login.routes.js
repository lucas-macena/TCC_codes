const express = require('express')
const router = express.Router()
const login = require('../controllers/loginController')


router.get('/',login.login)
router.post('/',login.efetuarLogin)

module.exports = {
    router
}