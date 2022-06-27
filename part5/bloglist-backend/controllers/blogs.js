const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = request.user
    if(!user){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(
        {
            _id: body._id,
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user.id
        }
    )
  try {
    const savedBlog = await blog.save()
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

  const user = request.user

  if(!user){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog === null) {
    return response.status(404).json({ error: 'blog doesn\'t exist' })
  }
  
  // check if the user is same as the poster
  const userSame = blog.user.toString() === user.id.toString()

  try {
    if(userSame){
      await Blog.findByIdAndRemove(request.params.id) 
      response.status(204).end()
    }
      response.status(403).end()
    
  } catch (exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const user = request.user

  if(!user){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const theblog = await Blog.findById(request.params.id)
  console.log('123');
  console.log(theblog);

  const newBlog = body;
  console.log(newBlog);

  const blog = 
    {
        _id: newBlog._id,
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes || 0,
        user: theblog.user
    }
  



  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    user.blogs = user.blogs.concat(updatedBlog._id)
    await user.save()
    response.status(201).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
  

})



module.exports = blogsRouter