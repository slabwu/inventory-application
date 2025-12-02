const express = require('express')
const app = express()

app.use('/', (req, res) => res.send('Hello!'))

const PORT = 8080
app.listen(PORT, error => {
    if (error) throw error
    console.log(`Listening on port ${PORT}`)
})