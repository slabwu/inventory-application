const db = require('../db/queries')
const { body, validationResult, matchedData } = require("express-validator")

const validateUser = [
    body('name').trim()
        .notEmpty().withMessage('Name is required.')
        .isAlpha().withMessage('Name must only contain letters.')
]

const getAddCategory = async (req, res) => {
    res.render('addCategory')
}

const addCategory = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let fields = matchedData(req, { onlyValidData: false })
        return res.status(400).render('addCategory', { errors: errors.mapped(), fields: fields })
    }
    await db.addCategory(req.body.name)
    res.redirect('/categories')
}

const postAddCategory = [ validateUser, addCategory ]

const getCategories = async (req, res) => {
    let categories = await db.getCategories()
    let inventory = await db.getCategoryInfo()
    res.render('categories', { categories: categories, inventory: inventory })
}

const getEditCategory = async (req, res) => {
    let category = await db.getCategory(req.params.categoryId)
    res.render('editCategory', { category: category })
}

const editCategory = async (req, res) => {
    let category = await db.getCategory(req.params.categoryId)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let fields = matchedData(req, { onlyValidData: false })
        return res.status(400).render('editCategory', { errors: errors.mapped(), fields: fields, category: category })
    }
    await db.editCategory(req.body.name, req.params.categoryId)
    res.redirect('/categories')
}

const postEditCategory = [ validateUser, editCategory ]

const postDeleteCategory = async (req, res) => {
    await db.deleteCategory(req.params.categoryId)
    res.redirect('/categories')
}

module.exports = {
    getAddCategory,
    postAddCategory,
    getCategories,
    getEditCategory,
    postEditCategory,
    postDeleteCategory
}