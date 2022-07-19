// initialize database

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

let authors = [
    {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963
    },
    {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821
    },
    { 
      name: 'Joshua Kerievsky', // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
      name: 'Sandi Metz', // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
  ]
  
  /*
   * Suomi:
   * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
   * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
   *
   * English:
   * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
   * However, for simplicity, we will store the author's name in connection with the book
  */
  
  let books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'crime']
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
  ]


const MONGODB_URI = 'mongodb+srv://rickz:932319718@cluster0.f3rfd.mongodb.net/libraryApp?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .then(async () => {
    await Author.deleteMany({})
    await Book.deleteMany({})
  })
  .then(async () => {
    for (let i = 0; i < authors.length; i++) {
      let author = new Author({
        name : authors[i].name,
        born : authors[i].born
      })
    //   await console.log(author);
      await author.save()
    }
  })
  .then(async () => {
    for (let i = 0; i < books.length; i++) {
        const aaa = await Author.findOne({name : books[i].author})
        // console.log(aaa);

      let book = new Book({
        title : books[i].title,
        published : books[i].published,
        author : aaa._id,
        genres : books[i].genres
      })
      // console.log(book);
      await book.save()
    }
  })
  .then(() => {
    mongoose.connection.close()
    console.log('finished');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })