const express = require('express')
const path = require('path')
const consolidate = require('consolidate')

const app = module.exports = express()

app.set('views', path.join(__dirname, '..', '..', 'views'))
app.set('view engine', 'html')
app.engine('html', consolidate.underscore)
app.use(express.static(path.join(__dirname, '..', '..', 'public')))
