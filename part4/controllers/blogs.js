const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const users = await User.find({})
    const blog = new Blog(
        {
            _id: body._id,
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: users[0]
        }
    )

    

  try {
    const savedBlog = await blog.save()
    const user = users[0]
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  
  const body = request.body;
  const newBlog = body;
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
  

})



module.exports = blogsRouter