const { Router } = require('express')
const indexController = require('../controllers/indexController')
const index = Router()

index.get('/', indexController.getIndex)

module.exports = index