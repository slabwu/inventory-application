const pool = require('./pool')

async function getProducts() {
    const { rows } = await pool.query('SELECT * FROM products')
    return rows
}

async function getProduct(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    return rows
}

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM categories')
    return rows
}

module.exports = {
    getProducts,
    getProduct,
    getCategories
}
