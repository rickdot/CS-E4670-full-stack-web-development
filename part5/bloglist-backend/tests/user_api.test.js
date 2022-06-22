const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')

const initialUser = [
    {
        username: "root",
        name: "Superuser",
        password: "12345678"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(initialUser[0].password, saltRounds)
    const user = {
        username: initialUser[0].username,
        name: initialUser[0].name,
        passwordHash: passwordHash
    }
    await User.insertMany(user)
})

test('a new user can be created ', async () => {
    const newUser = {
        username: 'test1',
        name: 'user1',
        password: '12345678'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUser.length + 1)
  
    const usernames = usersAtEnd.map(n => n.username)
    expect(usernames).toContain(newUser.username)
})

test('invalid user cannot be created', async () => {
    const newUser = {
        username: 'test2',
        name: 'user2',
        password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUser.length)
  
})


afterAll(() => {
    mongoose.connection.close()
})