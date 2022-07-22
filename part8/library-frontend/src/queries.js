import { gql } from "@apollo/client";



export const ALL_BOOKS = gql`
query {
  allBooks { 
    title 
    author{
      name
    }
    published 
    genres
  }
}
`


export const ALL_BOOKS_BY_GENRE = gql`
query getBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    author{
      name
      born
    }
    published
    genres
  }
}`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`


export const EDIT_BIRTHYEAR = gql`
mutation editBirth(
  $name: String! 
  $born: Int!
) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook(
  $title: String! 
  $published: Int!
  $author: String!
  $genres: [String]!
) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    author{
      name
    }
    published
    genres
}
}
`


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`