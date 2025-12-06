const { Router } = require('express')
const productController = require('../controllers/productController')
const product = Router()

product.get('/add', productController.getAddProduct)
product.post('/add', productController.postAddProduct)
product.get('/', productController.getProducts)
product.get('/:productId', productController.getProduct)
product.get('/:productId/edit', productController.getEditProduct)
product.post('/:productId/edit', productController.postEditProduct)
product.post('/:productId/delete', productController.postDeleteProduct)

module.exports = product