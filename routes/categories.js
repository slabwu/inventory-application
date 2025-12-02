const { Router } = require('express')
const categoryController = require('../controllers/categoryController')
const category = Router()

category.get('/', categoryController.getCategories)

module.exports = category