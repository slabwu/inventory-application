const db = require('../db/queries')

const getAddProduct = async (req, res) => {
    res.render('products')
}

const postAddProduct = async (req, res) => {
    res.render('products')
}

const getProducts = async (req, res) => {
    let products = await db.getProducts()
    res.render('products', { products: products })
}

const getProduct = async (req, res) => {
    res.render('products')
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