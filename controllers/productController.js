const db = require('../db/queries')
const { body, validationResult, matchedData } = require("express-validator")
require('dotenv').config()

const validateUser = [
    body('name').trim()
        .notEmpty().withMessage('Name is required.')
        .isAlpha('en-US', { ignore: ' ' }).withMessage('Name must only contain letters.'),
    body('emoji').trim()
        .notEmpty().withMessage('Emoji is required.')
        .matches(/\p{Extended_Pictographic}/u).withMessage('Must be valid emoji.')
        .isLength({ min: 1, max: 1 }).withMessage('Emoji must be one character only.'),
    body('price').trim()
        .notEmpty().withMessage('Price is required.')
        .isFloat({ min: 0.01 }).withMessage('Price must be a positive decimal.'),
    body('quantity').trim()
        .notEmpty().withMessage('Quantity is required.')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer.'),
    body('categoryId').trim()
        .notEmpty().withMessage('Category is required.')
]

const getAddProduct = async (req, res) => {
    let categories = await db.getCategories()
    res.render('addProduct', { categories: categories})
}

const addProduct = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let categories = await db.getCategories()
        let fields = matchedData(req, { onlyValidData: false })
        return res.status(400).render('addProduct', { errors: errors.mapped(), categories: categories, fields: fields })
    }
    await db.addProduct(matchedData(req))
    res.redirect('/products')
}

const postAddProduct = [ validateUser, addProduct ]

const getProducts = async (req, res) => {
    let search = req.query.search
    let sort = req.query.sort
    let filter = req.query.c
    let products
    let categories = await db.getCategories()

    if (search) {
        products = await db.findProducts(search)
    } else {
        products = await db.getProducts()
    }

    if (sort) {
        products = sortProducts(products, sort)
    }

    if (filter) {
        products = filterProducts(products, filter)
    }

    res.render('products', { products: products, search: search, sort: sort, filter: filter, categories: categories })
}

const sortProducts = (products, sort) => {
    switch(sort) {
        case 'nameAsc':
            return products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        case 'nameDesc':
            return products.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
        case 'priceAsc':
            return products.sort((a,b) => a.price - b.price)
        case 'priceDesc':
            return products.sort((a,b) => b.price - a.price)
        default:
            return products
    }
}

const filterProducts = (products, filter) => {
    return products.filter(product => filter.includes(product.category))
}

const getProduct = async (req, res) => {
    let product = await db.getProduct(req.params.productId)
    res.render('product', { product: product })
}

const getEditProduct = async (req, res) => {
    let product = await db.getProduct(req.params.productId)
    let categories = await db.getCategories()
    res.render('editProduct', { product: product, categories: categories, admin: process.env.ADMIN })
}

const editProduct = async (req, res) => {
    let product = await db.getProduct(req.params.productId)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let categories = await db.getCategories()
        let fields = matchedData(req, { onlyValidData: false })
        return res.status(400).render('editProduct', { errors: errors.mapped(), categories: categories, fields: fields, product: product, admin: process.env.ADMIN })
    }
    await db.editProduct({ ...req.body, id: req.params.productId})
    res.redirect(`/products/${req.params.productId}`)
}

const postEditProduct = [ validateUser, editProduct ]

const postDeleteProduct = async (req, res) => {
    await db.deleteProduct(req.params.productId)
    res.redirect('/products')
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