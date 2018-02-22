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

    if (request.body.likes === undefined) {
        request.body.likes = 0
    }

    if (request.body.url === undefined && request.body.title === undefined) {
        return response.status(400).json({ error: 'title and url missing' })
    }


    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.delete('/:id', (request, response) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})

blogsRouter.put('/:id', (request, response) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }
 

    Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogsRouter