const express = require('express')
const app = express()
const path = require('node:path')
const indexRoute = require('./routes/index')
const productRoute = require('./routes/products')
const categoryRoute = require('./routes/categories')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/categories', categoryRoute)

const PORT = 8080
app.listen(PORT, error => {
    if (error) throw error
    console.log(`Listening on port ${PORT}`)
})