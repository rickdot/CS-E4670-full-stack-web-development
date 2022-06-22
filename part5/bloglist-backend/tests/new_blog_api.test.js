// this is for exercise 4.23

const { doesNotMatch } = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const initialUser = {
        username : "testuser",
        name: "abcd",
        password: "123456"
    }

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // creating initial user
    const res = await api
        .post('/api/users')
        .send(initialUser)

})

test('a new blog post can be created ', async () => {
    // login and get token
    const res = await api
        .post('/api/login')
        .send(initialUser)
        .expect(200)
    const token = res.body.token
    // console.log(token);
    
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: "exercise 4.23",
      author: "Someone",
      url: "https://localhost.com/",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length + 1
    )
})


test('a blog cannot be created if token isn\'t given ', async () => {

    const token = ''
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: "exercise 4.23-2",
      author: "Someone",
      url: "https://localhost.com/",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length
    )
})

afterAll(() => {
mongoose.connection.close()
})