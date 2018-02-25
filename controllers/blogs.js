const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 } )

  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {



    try {
        const body = request.body



        if (request.body.likes === undefined) {
            request.body.likes = 0
        }

        if (request.body.url === undefined && request.body.title === undefined) {
            return response.status(400).json({ error: 'title and url missing' })
        }


        if(body.userId === undefined){ //Jos userid:tä ei ole annettu asetetaan sille oletusarvoksi testi-userin id
            body.userId = "5a92e3210ccf2b1e2cc4ef2a"
        }


        const user = await User.findById(body.userId)

        

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(Blog.format(blog))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }


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