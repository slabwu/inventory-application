const pool = require('./pool')

async function getProducts() {
    const { rows } = await pool.query('SELECT * FROM products')
    return rows
}

async function getProduct(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    return rows
}

async function addProduct(name, emoji, price, quantity, categoryId) {
    await pool.query('INSERT INTO products (name, emoji, price, quantity, categoryid) VALUES ($1,$2,$3,$4,$5)', 
        [name, emoji, price, quantity, categoryId]
    )
}

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM categories')
    return rows
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    getCategories
}
