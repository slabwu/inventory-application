const db = require('../db/queries')

const getAddProduct = async (req, res) => {
    let categories = await db.getCategories()
    res.render('addProduct', { categories: categories})
}

const postAddProduct = async (req, res) => {
    let form = req.body
    await db.addProduct(form.name, form.emoji, form.price, form.quantity, form.categoryId)
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
    res.render('products')
}

const postEditProduct = async (req, res) => {
    res.render('products')
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