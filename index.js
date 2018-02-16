const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const blogsRouter = require("./controllers/blogs")


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


app.use(cors())
app.use(bodyParser.json())
app.use(express.static("build"))
app.use(middleware.logger)

app.use("/api/blogs", blogsRouter)

const mongoUrl = 'mongodb://admin:salasana@ds229448.mlab.com:29448/fullstack2037'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use(middleware.error)

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})