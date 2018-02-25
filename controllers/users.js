const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


const formatUser = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        of_age: user.of_age,
        blogs: user.blogs
    }
}

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const existingUser = await User.find({ username: body.username })
        if (existingUser.length > 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        if(body.of_age === undefined){
            body.of_age = true
        }
        
        if(body.password.length < 3){
            return response.status(400).json({ error: 'password must be atleast 3 characters' })
        }

        if(body.username === undefined || body.name === undefined){
            return response.status(400).json({ error: 'please enter username and name separately' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            of_age: body.of_age,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})



usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(formatUser))
})

module.exports = usersRouter