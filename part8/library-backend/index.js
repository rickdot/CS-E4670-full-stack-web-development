const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const typeDefs = require('./types')


const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'



const MONGODB_URI = 'mongodb+srv://rickz:932319718@cluster0.f3rfd.mongodb.net/libraryApp?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const resolvers = {
  Query: {

    authorCount: () => Author.collection.countDocuments(),

    bookCount: () => Book.collection.countDocuments(),

    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      // console.log(books);
      // const authors = await Author.find({})
      if(args.author && !args.genre){
        // console.log(args.author);
        return books.filter(e => e.author.name===args.author)
      }
      if(args.genre && !args.author){
        return books.filter(e => e.genres.includes(args.genre))  
      }
      if(args.author && args.genre){
        return books.filter(e => e.author.name===args.author && e.genres.includes(args.genre))
      }
      
      return books
    },

    allAuthors: async () => {
      const res = await Author.find({})
      // console.log(res);
      // console.log(res);
      return res
    },

    me: (root, args, context) => {
      return context.currentUser
    }

      
  },

  Author: {
    // ok
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      // console.log(books);
      return books.filter(e => e.author.name === root.name).length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new UserInputError("Authentication failed");
      }

      const books = await Book.find({}).populate('author')
      // check if author already exists
      const authorFind = await Author.findOne({name : args.author}) 
      if(!authorFind){
        const newAuthor = new Author({name: args.author, born: null})
        await newAuthor.save()
      }
      const resAuthor = await Author.find({name: args.author})
      // adding new book
      const newBook = new Book({ ...args, author: resAuthor[0]._id }) 
      try {
        const res = await newBook.save()
        const returnBook = await Book.findById(res._id).populate('author')
        return returnBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new UserInputError("Authentication failed");
      }

      const authorFound = await Author.findOne({name: args.name})
      if(!authorFound){
        return null
      }
      authorFound.born = args.setBornTo
      try {
        await authorFound.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return authorFound.save()
    },

    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author.save()
    },

    createUser: async (root, args) => {
      // console.log(args.username);
      // console.log(args.favouriteGenre);
      const user = new User({ username: args.username, favouriteGenre: String(args.favouriteGenre) })
      console.log(user);
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      console.log(args);
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        console.log('error');
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      console.log(userForToken);
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})


