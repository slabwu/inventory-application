const db = require('../db/queries')

const getAddCategory = async (req, res) => {
    res.render('categories')
}

const postAddCategory = async (req, res) => {
    res.render('categories')
}

const getCategories = async (req, res) => {
    let categories = await db.getCategories()
    res.render('categories', { categories: categories })
}

const getCategory = async (req, res) => {
    res.render('categories')
}

const getEditCategory = async (req, res) => {
    res.render('categories')
}

const postEditCategory = async (req, res) => {
    res.render('categories')
}

const postDeleteCategory = async (req, res) => {
    res.render('categories')
}

module.exports = {
    getAddCategory,
    postAddCategory,
    getCategories,
    getCategory,
    getEditCategory,
    postEditCategory,
    postDeleteCategory
}