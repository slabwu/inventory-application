const pool = require('./pool')

async function getProducts() {
    const { rows } = await pool.query('SELECT * FROM products')
    return rows
}

async function getProduct(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    return rows
}

module.exports = {
    getProducts,
    getProduct
}
