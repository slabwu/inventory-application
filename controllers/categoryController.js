const db = require('../db/queries')
const { body, validationResult, matchedData } = require("express-validator")

const getAddCategory = async (req, res) => {
    res.render('addCategory')
}

const postAddCategory = async (req, res) => {
    await db.addCategory(req.body.name)
    res.redirect('/categories')
}

const getCategories = async (req, res) => {
    let categories = await db.getCategories()
    let inventory = await db.getCategoryInfo()
    res.render('categories', { categories: categories, inventory: inventory })
}

const getEditCategory = async (req, res) => {
    let category = await db.getCategory(req.params.categoryId)
    res.render('editCategory', { category: category })
}

const postEditCategory = async (req, res) => {
    await db.editCategory(req.body.name, req.params.categoryId)
    res.redirect('/categories')
}

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