const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

describe("GET tests", () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

})

describe("POST tests", () => {

    test("blog is added to database", async () => {
        const newBlog = {
            title: "test",
            author: "tester",
            url: "test.com"
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        const contents = response.body.map(r => r.title)


        expect(contents).toContain('test')
    
})
    



})

afterAll(() => {
    server.close()
})