const db = require('../db/queries')

const getAddProduct = async (req, res) => {
    let categories = await db.getCategories()
    res.render('addProduct', { categories: categories})
}

const postAddProduct = async (req, res) => {
    await db.addProduct(req.body)
    res.redirect('/products')
}

const getProducts = async (req, res) => {
    let products = await db.getProducts()
    res.render('products', { products: products })
}

const getProduct = async (req, res) => {
    let [ product ] = await db.getProduct(req.params.productId)
    res.render('product', { product: product })
}

const getEditProduct = async (req, res) => {
    let [ product ] = await db.getProduct(req.params.productId)
    let categories = await db.getCategories()
    res.render('editProduct', { product: product, categories: categories })
}

const postEditProduct = async (req, res) => {
    await db.editProduct({ ...req.body, id: req.params.productId})
    res.redirect(`/products/${req.params.productId}`)
}

const postDeleteProduct = async (req, res) => {
    res.render('products')
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
}