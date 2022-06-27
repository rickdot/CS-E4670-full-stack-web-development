const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// const tokenExtractor = (request, response, next) => {
//   const authorization = request.get('Authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     request.token =  authorization.substring(7)
//   } else {
//     request.token = null
//   }
//   next()
// }

const userExtractor = async (request, response, next) => {
  // console.log(request);
  // get token
  let token = null
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token =  authorization.substring(7)
  } 

  // check token
  let decodedToken = null
  try{
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error){
    decodedToken = null
  }
  // console.log(decodedToken);

  if(token === null || decodedToken === null){
    request.user = null
  } else {
    request.user = await User.findById(decodedToken.id)

  }

  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
}