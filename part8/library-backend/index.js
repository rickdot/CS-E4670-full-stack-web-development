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
    authorCount: () => books.length,
    bookCount: () => authors.length,
    allBooks: (root, args) => {
      if(args.author && !args.genre){
        return books.filter(e => e.author===args.author)
      }
      if(args.genre && !args.author){
        return books.filter(e => e.genres.includes(args.genre))
      }
      if(args.author && args.genre){
        return books.filter(e => e.author===args.author && e.genres.includes(args.genre))
      }
      
      return books
    },
    allAuthors: () => authors
  },

  Author: {
    bookCount: (root) => books.filter(e => e.author === root.name).length
  },

  Mutation: {
    addBook: (root, args) => {
      const book = {...args, id: uuid()}
      books = books.concat(book)
      // console.log(books);
      // check if author already exists
      const authorsArr = authors.map(e => e.name)

      if(!authorsArr.includes(book.author)){
        const author = {
          name: book.author,
          id: uuid(),
          born: null
        }
        authors = authors.concat(author)
        
      }
      return book
    },
    editAuthor: (root, args) => {

      const authorFind = authors.find(e => e.name===args.name)
      if (!authorFind){
        return null
      }
      const authorEdited = {...authorFind, born: args.setBornTo} 

      authors = authors.map(e => e.name===args.name ? authorEdited : e)

      return authorEdited
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


