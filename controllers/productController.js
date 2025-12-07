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
    res.render('editProduct', { product: product, categories: categories })
}

const postEditProduct = async (req, res) => {
    await db.editProduct({ ...req.body, id: req.params.productId})
    res.redirect(`/products/${req.params.productId}`)
}

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