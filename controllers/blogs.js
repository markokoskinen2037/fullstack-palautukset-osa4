const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {

    if(request.body.likes === undefined){
        request.body.likes = 0
    }

    if(request.body.url === undefined && request.body.title === undefined){
        return response.status(400).json({ error: 'title and url missing' })
    }


    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter