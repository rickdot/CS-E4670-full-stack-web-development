const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Author = require('./models/author')
const Book = require('./models/book')
const typeDefs = require('./types')



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
    // ok
    authorCount: () => Author.collection.countDocuments(),
    // ok
    bookCount: () => Book.collection.countDocuments(),
    // ok
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
    // ok
    allAuthors: async () => {
      const res = await Author.find({})
      // console.log(res);
      // console.log(res);
      return res
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
    // ok
    addBook: async (root, args) => {
      const books = await Book.find({}).populate('author')
      // const authors = await Author.find({})
    

      // check if author already exists
      const authorFind = await Author.findOne({name : args.author})
      // console.log(authorFind);
      
      if(!authorFind){
        const newAuthor = new Author({name: args.author, born: null})
        await newAuthor.save()
        // console.log('added author!');
      }
      const resAuthor = await Author.find({name: args.author})
      // console.log(resAuthor);

      // adding new book
      const newBook = new Book({ ...args, author: resAuthor[0]._id }) 
      const res = await newBook.save()
      // console.log(res);
      const returnBook = await Book.findById(res._id).populate('author')
      return returnBook
    },

    // ok
    editAuthor: async (root, args) => {

      const authorFound = await Author.findOne({name: args.name})
      if(!authorFound){
        return null
      }
      authorFound.born = args.setBornTo
      const res = await authorFound.save()
      return res
    },

    // ok
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      console.log(author);
      return author.save()
    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})


