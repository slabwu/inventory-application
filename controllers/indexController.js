const db = require('../db/queries')

const getIndex = async (req, res) => {
    let inventory = await db.getInventoryInfo()
    res.render('index', { inventory: inventory })
}

module.exports = {
    getIndex
}