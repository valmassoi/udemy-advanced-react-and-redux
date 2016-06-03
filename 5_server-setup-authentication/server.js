const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')// middleware (any incoming req)
const morgan = require('morgan')// middleware (any incoming req)
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27018/data'
mongoose.connect(dbUrl)

app.use(morgan('combined')) // a loging framework
app.use(bodyParser.json({ type: '*/*' })) // any req will be parsed as json (not good if you have non json req)
router(app)

const PORT = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(PORT)
console.log('server listening on:', PORT);
