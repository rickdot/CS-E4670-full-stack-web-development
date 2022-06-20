const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

// 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// 4.9
test('the unique identifier property of the blog posts is named _id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0]);
    expect(response.body[0]._id).toBeDefined()
})

// 4.10
test('a new blog post can be created ', async () => {
  const newBlog = {
    _id: "5a423a851b54a676234d17f7",
    title: "exercise 4.10",
    author: "Someone",
    url: "https://localhost.com/",
    likes: 8,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'exercise 4.10'
  )
})

// 4.11
test('missing likes property will default to the value 0', async () => {
    const newBlog = {
        _id: "5a424a851b54a676234d17f7",
        title: "exercise 4.11",
        author: "Someone",
        url: "https://localhost.com/411",
        __v: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blog = blogsAtEnd.find(n => n.title === newBlog.title)
    console.log(blog);
    expect(blog.likes).toBe(0)

})

// 4.12
test('cannot add blog with missing url', async () => {
    const newBlog = {
        title: "exercise 4.12"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('cannot add blog with missing url', async () => {
    const newBlog = {
        url: "https://localhost.com/412"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})