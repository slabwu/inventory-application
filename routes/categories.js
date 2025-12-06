const { Router } = require('express')
const categoryController = require('../controllers/categoryController')
const category = Router()

category.get('/add', categoryController.getAddCategory)
category.post('/add', categoryController.postAddCategory)
category.get('/', categoryController.getCategories)
category.get('/:categoryId/edit', categoryController.getEditCategory)
category.post('/:categoryId/edit', categoryController.postEditCategory)
category.post('/:categoryId/delete', categoryController.postDeleteCategory)

module.exports = category