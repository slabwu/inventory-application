const pool = require('./pool')

async function getInventoryInfo() {
    const products = await getProducts()
    let inventory = {
        products: products.length,
        quantity: 0,
        value: 0,
        categories: {}
    }

    products.forEach(product => {
        inventory.quantity += Number(product.quantity)
        inventory.value += Number(product.price * product.quantity)
        inventory.categories[product.category] = (inventory.categories[product.category] ?? 0) + Number(product.quantity)
    })

    return inventory
}

async function getProducts() {
    const { rows } = await pool.query('SELECT p.id, p.name, p.emoji, p.price, p.quantity, c.name AS category FROM products p LEFT JOIN categories c ON p.categoryid = c.id')
    return rows
}

async function getProduct(id) {
    const { rows } = await pool.query('SELECT p.id, p.name, p.emoji, p.price, p.quantity, c.name AS category FROM products p LEFT JOIN categories c ON p.categoryid = c.id WHERE p.id = $1', [id])
    return rows[0]
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

async function deleteProduct(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id])
}

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM categories')
    return rows
}

async function getCategory(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id])
    return rows[0]
}

async function addCategory(name) {
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [name])
}

async function editCategory(name, id) {
    await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name, id])
}

async function deleteCategory(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id])
}

module.exports = {
    getInventoryInfo,
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory
}
