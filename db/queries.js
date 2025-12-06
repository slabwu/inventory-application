const pool = require('./pool')

async function getProducts() {
    const { rows } = await pool.query('SELECT p.id, p.name, p.emoji, p.price, p.quantity, c.name AS category FROM products p JOIN categories c ON p.categoryid = c.id')
    return rows
}

async function getProduct(id) {
    const { rows } = await pool.query('SELECT p.id, p.name, p.emoji, p.price, p.quantity, c.name AS category FROM products p JOIN categories c ON p.categoryid = c.id WHERE p.id = $1', [id])
    return rows
}

async function addProduct(product) {
    await pool.query('INSERT INTO products (name, emoji, price, quantity, categoryid) VALUES ($1,$2,$3,$4,$5)', 
        [product.name, product.emoji, product.price, product.quantity, product.categoryId]
    )
}

async function editProduct(product) {
    await pool.query('UPDATE products SET name = $1, emoji = $2, price = $3, quantity = $4, categoryid = $5 WHERE id = $6', 
        [product.name, product.emoji, product.price, product.quantity, product.categoryId, product.id]
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
    editProduct,
    getCategories
}
